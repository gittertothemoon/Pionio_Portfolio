import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Plasma fragment shader. Tuned for a more dynamic/fluid feel while keeping
// fragment cost equivalent to the previous version (still 4-octave fbm).
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(dot(hash(i + vec2(0.0,0.0)), f - vec2(0.0,0.0)),
            dot(hash(i + vec2(1.0,0.0)), f - vec2(1.0,0.0)), u.x),
        mix(dot(hash(i + vec2(0.0,1.0)), f - vec2(0.0,1.0)),
            dot(hash(i + vec2(1.0,1.0)), f - vec2(1.0,1.0)), u.x),
        u.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
        v += a * noise(p);
        p *= 2.02;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float t = u_time * 0.32;

    // Slow swirl rotates the warp field over time -> obvious continuous motion.
    float ca = cos(t * 0.25);
    float sa = sin(t * 0.25);
    vec2 swirl = mat2(ca, -sa, sa, ca) * uv;

    // Single domain-warp pass (still 1 fbm-pair) but with stronger amplitude
    // and time-varying offsets for a more liquid look.
    vec2 q = vec2(fbm(swirl + vec2(0.0, t)),
                  fbm(swirl + vec2(5.2, t * 1.3)));

    float f = fbm(uv + 4.0 * q + vec2(1.7 + t * 0.8, 9.2));

    // Mouse parallax pull
    vec2 m = (u_mouse - 0.5) * 0.4;
    float mDist = length(uv - m);
    float glow = smoothstep(0.9, 0.0, mDist) * 0.35;

    // Forest palette — slightly brighter mid+accent so plasma is more visible.
    vec3 deep   = vec3(0.012, 0.024, 0.018);
    vec3 mid    = vec3(0.055, 0.180, 0.122);
    vec3 accent = vec3(0.125, 0.420, 0.260);
    vec3 hi     = vec3(0.470, 0.780, 0.555);

    vec3 col = deep;
    col = mix(col, mid, smoothstep(-0.3, 0.6, f));
    col = mix(col, accent, smoothstep(0.2, 0.85, f) * 0.95);
    col = mix(col, hi, pow(smoothstep(0.5, 0.95, f), 2.5) * 0.75);

    col += vec3(0.07, 0.22, 0.14) * glow;

    // Softer vignette so plasma reads further out from the centre.
    float vig = smoothstep(1.55, 0.15, length(uv));
    col *= mix(0.7, 1.05, vig);

    col = pow(col, vec3(0.92));

    gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
    }
    return sh;
}

export function ShaderBackground({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        // On mobile/low-end the shader is the bottleneck; cap DPR aggressively
        // and fall back to a low resolution that still looks fine when blurred.
        const dprCap = isCoarsePointer ? 1 : 1.5;
        const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
        // Internal render scale: drawing at 65% on mobile keeps fragment work
        // bounded; the plasma is low-frequency so this is invisible behind the overlay.
        const renderScale = isCoarsePointer ? 0.65 : 1;

        const gl = canvas.getContext('webgl', {
            antialias: false,
            alpha: false,
            premultipliedAlpha: false,
            powerPreference: 'low-power',
        });
        if (!gl) return;

        const prog = gl.createProgram()!;
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const loc = gl.getAttribLocation(prog, 'a_pos');
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, 'u_res');
        const uTime = gl.getUniformLocation(prog, 'u_time');
        const uMouse = gl.getUniformLocation(prog, 'u_mouse');

        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

        let lastW = 0;
        let lastH = 0;
        const applyResize = () => {
            const w = Math.floor(canvas.clientWidth * dpr * renderScale);
            const h = Math.floor(canvas.clientHeight * dpr * renderScale);
            // Ignore sub-pixel jitter from mobile URL-bar show/hide so we don't
            // reallocate the framebuffer mid-scroll (which was the main flicker source).
            if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 64) return;
            lastW = w;
            lastH = h;
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
        };
        applyResize();

        let resizeTimer = 0;
        const scheduleResize = () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(applyResize, 180);
        };
        window.addEventListener('resize', scheduleResize);
        window.addEventListener('orientationchange', scheduleResize);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.tx = (e.clientX - rect.left) / rect.width;
            mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
        };
        if (!isCoarsePointer) {
            window.addEventListener('mousemove', onMove, { passive: true });
        }

        let visible = true;
        const io = new IntersectionObserver(
            (entries) => {
                visible = entries[0].isIntersecting;
            },
            { rootMargin: '50px' },
        );
        io.observe(canvas);

        const onVisibility = () => {
            visible = !document.hidden;
        };
        document.addEventListener('visibilitychange', onVisibility);

        const renderFrame = (timeSec: number) => {
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, timeSec);
            gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const start = performance.now();
        const timeScale = reduceMotion ? 0.25 : 1;

        // Frame-rate target. Mobile / coarse-pointer is capped at 30fps by default
        // (looks smooth for low-frequency plasma, halves GPU work). Desktop runs full.
        // Adaptive: if avg frame interval grows past 22ms over a 1.5s window we
        // demote to 30fps, eliminating jank on weaker GPUs.
        let minFrameMs = isCoarsePointer ? 32 : 0;
        let lastDraw = 0;

        // Adaptive perf monitor — desktop only. We sample the first ~1.5s of frames
        // and demote to 30fps if performance is poor. Cheap: ints + early-exit.
        let monitorActive = !isCoarsePointer && !reduceMotion;
        let monitorFrames = 0;
        let monitorStart = 0;

        const tick = (now: number) => {
            rafRef.current = requestAnimationFrame(tick);
            if (!visible) return;

            // Frame throttle for mobile / demoted desktop.
            if (minFrameMs > 0 && now - lastDraw < minFrameMs - 1) return;
            lastDraw = now;

            mouse.x += (mouse.tx - mouse.x) * 0.05;
            mouse.y += (mouse.ty - mouse.y) * 0.05;
            renderFrame(((now - start) / 1000) * timeScale);

            if (monitorActive) {
                if (monitorStart === 0) monitorStart = now;
                monitorFrames++;
                const elapsed = now - monitorStart;
                if (elapsed > 1500) {
                    const avgMs = elapsed / monitorFrames;
                    if (avgMs > 22) minFrameMs = 32; // demote to ~30fps
                    monitorActive = false;
                }
            }
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('resize', scheduleResize);
            window.removeEventListener('orientationchange', scheduleResize);
            if (!isCoarsePointer) window.removeEventListener('mousemove', onMove);
            document.removeEventListener('visibilitychange', onVisibility);
            io.disconnect();
            window.clearTimeout(resizeTimer);
        };
    }, []);

    // Note: do NOT apply transform/will-change directly to the <canvas> on iOS Safari —
    // it freezes the canvas as a static texture in the compositor. The wrapper
    // (in Hero.tsx) is the layer-promoted element instead.
    return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
}
