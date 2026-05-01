import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

// 2D simplex-ish hash + value noise
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
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p *= 2.02;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / u_res.y;
    float t = u_time * 0.08;

    // Domain warp for that liquid 3D feel
    vec2 q = vec2(fbm(uv + vec2(0.0, t)),
                  fbm(uv + vec2(5.2, t * 1.3)));

    vec2 r = vec2(fbm(uv + 4.0 * q + vec2(1.7 + t, 9.2)),
                  fbm(uv + 4.0 * q + vec2(8.3 - t, 2.8)));

    float f = fbm(uv + 4.0 * r);

    // Mouse parallax pull
    vec2 m = (u_mouse - 0.5) * 0.4;
    float mDist = length(uv - m);
    float glow = smoothstep(0.9, 0.0, mDist) * 0.25;

    // Forest palette
    vec3 deep   = vec3(0.012, 0.024, 0.018);   // near-black green
    vec3 mid    = vec3(0.039, 0.137, 0.094);   // forest-900-ish
    vec3 accent = vec3(0.094, 0.353, 0.212);   // forest-600
    vec3 hi     = vec3(0.392, 0.682, 0.475);   // forest-400 highlight

    vec3 col = deep;
    col = mix(col, mid, smoothstep(-0.2, 0.6, f));
    col = mix(col, accent, smoothstep(0.3, 0.85, f) * 0.85);
    col = mix(col, hi, pow(smoothstep(0.55, 0.95, f), 3.0) * 0.6);

    // Mouse glow
    col += vec3(0.05, 0.18, 0.11) * glow;

    // Subtle vignette
    float vig = smoothstep(1.4, 0.2, length(uv));
    col *= mix(0.55, 1.0, vig);

    // Filmic-ish tone + slight grain
    col = pow(col, vec3(0.95));
    float grain = (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.025;
    col += grain;

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

        const gl = canvas.getContext('webgl', { antialias: false, alpha: false, premultipliedAlpha: false });
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

        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

        const resize = () => {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        const onMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.tx = (e.clientX - rect.left) / rect.width;
            mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
        };
        window.addEventListener('mousemove', onMove);

        let visible = true;
        const io = new IntersectionObserver((entries) => {
            visible = entries[0].isIntersecting;
        });
        io.observe(canvas);

        const start = performance.now();
        const tick = () => {
            if (visible) {
                mouse.x += (mouse.tx - mouse.x) * 0.05;
                mouse.y += (mouse.ty - mouse.y) * 0.05;
                gl.uniform2f(uRes, canvas.width, canvas.height);
                gl.uniform1f(uTime, (performance.now() - start) / 1000);
                gl.uniform2f(uMouse, mouse.x, mouse.y);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            window.removeEventListener('mousemove', onMove);
            ro.disconnect();
            io.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
}
