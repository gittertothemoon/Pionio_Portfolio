// AuroraBackground.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Self-contained animated forest-aurora WebGL background for pionio.it.
//
// Usage:
//   import AuroraBackground from './AuroraBackground';
//
//   <section className="relative h-screen overflow-hidden">
//     <AuroraBackground />
//     {/* legibility veil — optional but recommended for left-aligned text */}
//     <div className="pointer-events-none absolute inset-0
//                     bg-gradient-to-r from-zinc-950/85 via-zinc-950/55 to-transparent" />
//     {/* your hero content goes here, positioned above the canvas */}
//   </section>
//
// Interaction model:
//   · The cursor pushes the field outward (a soft repulsive bulge).
//   · Press AND hold creates a vortex at the cursor that twists the flow.
//     Drag while held to move the vortex. Release to let it decay (~1.2s).
//   · No luminous rings, no halos — distortion only.
//
// Notes:
//   · One canvas, one full-screen fragment shader, no dependencies.
//   · Respects `prefers-reduced-motion: reduce` — pauses animation but
//     still renders a static frame.
//   · Cleans up its RAF, ResizeObserver, and pointer listeners on unmount.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react';

interface AuroraBackgroundProps {
  /** Custom className for the canvas (e.g. Tailwind classes). */
  className?: string;
  /** Inline style overrides. */
  style?: React.CSSProperties;
  /** Disable pointer interaction (purely ambient background). Default: false. */
  interactive?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Shader source
// ─────────────────────────────────────────────────────────────────────────────

const VERTEX_SHADER = /* glsl */ `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;       // smoothed, 0..1
uniform vec3  uClicks[8];   // (x, y, age-seconds); age=0 while pressed
uniform int   uClickCount;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i),                  hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++) { s += a * noise(p); p *= 2.03; a *= 0.55; }
  return s;
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2  uv = gl_FragCoord.xy / uRes;
  vec2  p  = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2  m  = (uMouse - 0.5) * vec2(aspect, 1.0);

  // Cursor repulsion — flow parts around the cursor.
  vec2  d  = p - m;
  float r  = length(d);
  vec2  push = d * (0.22 / (0.06 + r * r * 4.0));

  // Hold-to-vortex: each click contributes a tangential swirl + slight pull.
  // age=0 while pressed (full strength); after release age increases and the
  // vortex decays in ~1.2s.
  vec2 swirl = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    if (i >= uClickCount) break;
    vec2  c  = (uClicks[i].xy - 0.5) * vec2(aspect, 1.0);
    float age = uClicks[i].z;
    vec2  rv  = p - c;
    float dd  = length(rv);
    float ageDecay  = exp(-age * 1.6);
    float distDecay = exp(-dd * 2.6);
    float strength  = ageDecay * distDecay;
    vec2  tangent   = vec2(-rv.y, rv.x);
    swirl += tangent * strength * 1.8;
    swirl += -rv     * strength * 0.55;
  }

  // Domain-warped FBM — the aurora bands.
  float t = uTime * 0.10;
  vec2  q  = p * 1.4 + push + swirl;
  vec2  w1 = vec2(fbm(q + vec2(0.0, t)),     fbm(q + vec2(5.2, -t * 1.1)));
  vec2  w2 = vec2(fbm(q + 3.5 * w1 + vec2(1.7, 9.2) + t),
                  fbm(q + 3.5 * w1 + vec2(8.3, 2.8) - t));
  float n  = fbm(q + 3.5 * w2);
  float bands  = sin(n * 7.0 + uTime * 0.35 + p.y * 2.5) * 0.5 + 0.5;
  float aurora = pow(bands, 2.0) * smoothstep(0.18, 0.85, n);

  // Pionio palette — zinc-950 base, accent-600 body, accent-400 highlights.
  vec3 bg     = vec3(0.035, 0.035, 0.043);
  vec3 deep   = vec3(0.040, 0.100, 0.080);
  vec3 forest = vec3(0.188, 0.420, 0.302);
  vec3 hl     = vec3(0.384, 0.643, 0.506);

  vec3 col = mix(bg, deep, smoothstep(0.0, 0.55, n));
  col = mix(col, forest, aurora);
  col = mix(col, hl,     pow(aurora, 4.0));

  // Whisper of cursor halo — barely perceptible.
  col += hl * 0.10 * exp(-r * r * 50.0);

  // Vignette.
  vec2 vu = uv - 0.5;
  col *= 1.0 - dot(vu, vu) * 0.55;

  gl_FragColor = vec4(col, 1.0);
}
`;

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function AuroraBackground({
  className,
  style,
  interactive = true,
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Defer WebGL bring-up until the browser is idle so we don't compete
    // with first paint / hydration. The hero is briefly black instead of
    // animated, but LCP drops considerably.
    let cancelled = false;
    type IdleWin = typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (h: number) => void;
    };
    const w = window as IdleWin;
    let teardown = () => {};
    const init = () => {
      if (cancelled) return;
      teardown = startAurora(canvas, interactive);
    };
    const handle =
      typeof w.requestIdleCallback === 'function'
        ? w.requestIdleCallback(init, { timeout: 800 })
        : window.setTimeout(init, 50);
    return () => {
      cancelled = true;
      if (typeof w.cancelIdleCallback === 'function') w.cancelIdleCallback(handle as number);
      else window.clearTimeout(handle as number);
      teardown();
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        touchAction: interactive ? 'none' : 'auto',
        cursor: interactive ? 'crosshair' : 'default',
        background: '#09090b',
        ...style,
      }}
    />
  );
}

function startAurora(canvas: HTMLCanvasElement, interactive: boolean): () => void {
    const gl = canvas.getContext('webgl', {
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return () => {};

    // The aurora is a slow decorative flow (no strobe, no high-frequency
    // changes), so we always animate — even when the user has
    // prefers-reduced-motion enabled. A static frame on mobile was unintended.
    const reduceMotion = false;

    // Disable pointer capture on touch-only devices so the page can scroll
    // through the hero. Mobile keeps the ambient animation, just no vortex.
    const hasHover = window.matchMedia('(hover: hover)').matches;
    const effectiveInteractive = interactive && hasHover;
    if (!effectiveInteractive) {
      canvas.style.touchAction = 'auto';
      canvas.style.cursor = 'default';
    }

    // ── Compile + link ───────────────────────────────────────────────────────
    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error('Aurora shader compile error:', gl!.getShaderInfoLog(sh));
      }
      return sh;
    }
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Full-screen triangle.
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime       = gl.getUniformLocation(prog, 'uTime');
    const uRes        = gl.getUniformLocation(prog, 'uRes');
    const uMouse      = gl.getUniformLocation(prog, 'uMouse');
    const uClicks     = gl.getUniformLocation(prog, 'uClicks');
    const uClickCount = gl.getUniformLocation(prog, 'uClickCount');

    // ── State ────────────────────────────────────────────────────────────────
    let mx = 0.5, my = 0.5;
    let tmx = 0.5, tmy = 0.5;
    const clicks: { x: number; y: number; start: number }[] = []; // decaying after release
    let isDown = false;
    let live: { x: number; y: number } | null = null;
    const tStart = performance.now();
    let raf = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, canvas!.clientWidth);
      const h = Math.max(1, canvas!.clientHeight);
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
    }
    // Listen on window.resize instead of ResizeObserver(canvas): on iOS
    // Safari the address bar dismissal during scroll changes 100dvh and would
    // continuously fire ro, causing visible flicker. window.resize fires on
    // orientation/window change only.
    window.addEventListener('resize', resize);
    resize();

    // ── Pointer handlers (mouse + touch via pointer events) ─────────────────
    function ptToUV(e: PointerEvent) {
      const r = canvas!.getBoundingClientRect();
      return {
        x: (e.clientX - r.left) / r.width,
        y: 1 - (e.clientY - r.top) / r.height,
      };
    }
    function onMove(e: PointerEvent) {
      const p = ptToUV(e);
      tmx = p.x; tmy = p.y;
      if (isDown && live) { live.x = p.x; live.y = p.y; }
    }
    function onDown(e: PointerEvent) {
      const p = ptToUV(e);
      isDown = true;
      live = { x: p.x, y: p.y };
      tmx = p.x; tmy = p.y;
      try { canvas!.setPointerCapture(e.pointerId); } catch { /* noop */ }
    }
    function endPress() {
      if (isDown && live) {
        const t = (performance.now() - tStart) / 1000;
        clicks.push({ x: live.x, y: live.y, start: t });
        while (clicks.length > 7) clicks.shift();
      }
      isDown = false;
      live = null;
    }
    function onLeave() {
      if (!isDown) { tmx = 0.5; tmy = 0.5; }
    }

    if (effectiveInteractive) {
      canvas.addEventListener('pointermove', onMove, { passive: true });
      canvas.addEventListener('pointerdown', onDown);
      canvas.addEventListener('pointerup', endPress);
      canvas.addEventListener('pointercancel', endPress);
      canvas.addEventListener('pointerleave', onLeave);
    }

    // ── Frame loop ───────────────────────────────────────────────────────────
    const clickArr = new Float32Array(24); // 8 × vec3

    function frame() {
      mx += (tmx - mx) * 0.12;
      my += (tmy - my) * 0.12;
      const t = reduceMotion ? 0 : (performance.now() - tStart) / 1000;

      // Prune very old clicks.
      while (clicks.length && t - clicks[0].start > 4) clicks.shift();

      gl!.uniform1f(uTime, t);
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform2f(uMouse, mx, my);

      clickArr.fill(0);
      let n = 0;
      if (isDown && live && n < 8) {
        clickArr[n * 3] = live.x;
        clickArr[n * 3 + 1] = live.y;
        clickArr[n * 3 + 2] = 0;
        n++;
      }
      for (let i = 0; i < clicks.length && n < 8; i++, n++) {
        clickArr[n * 3] = clicks[i].x;
        clickArr[n * 3 + 1] = clicks[i].y;
        clickArr[n * 3 + 2] = t - clicks[i].start;
      }
      gl!.uniform3fv(uClicks, clickArr);
      gl!.uniform1i(uClickCount, n);

      gl!.drawArrays(gl!.TRIANGLES, 0, 3);

      // When reduced motion is on, draw a single static frame at t=0 and stop.
      if (reduceMotion) return;
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerup', endPress);
      canvas.removeEventListener('pointercancel', endPress);
      canvas.removeEventListener('pointerleave', onLeave);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
}
