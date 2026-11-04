import { useEffect, useRef, useState } from 'react';

// A line drawing that turns into the actual render (WebGL). Plays once when the
// element is well into view: the line work draws itself on like a pen, then the
// render rises from the bottom through a soft ink-bleed edge. Before it finishes, the cursor brushes the render
// through. Shows the finished render without WebGL or with reduced motion.

interface Props {
  drawing: string;
  render: string;
  alt: string;
  /** focus of the cover crop, 0–1 (y: 0 = bottom, 1 = top) */
  focusX?: number;
  focusY?: number;
  /** how light the drawing reads, 0 (full ink) – 1 (white) */
  lighten?: number;
  durationMs?: number;
  className?: string;
  /** a different crop for phones (under 768px), e.g. a wider one for a short frame */
  small?: { drawing: string; render: string; focusX?: number; focusY?: number };
}

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() { vUv = aPos * 0.5 + 0.5; gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform sampler2D uDraw;
uniform sampler2D uPhoto;
uniform vec2 uRes;
uniform vec2 uImg;
uniform float uFocus;
uniform float uFocusY;
uniform float uLighten;
uniform float uProgress;
uniform float uTime;
uniform vec2 uMouse;
uniform float uBrush;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; } return v; }

void main() {
  // cover-fit with a horizontal focus point
  float rs = uRes.x / uRes.y, ri = uImg.x / uImg.y;
  vec2 scale = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
  vec2 uv = (vUv - 0.5) * scale + vec2(mix(scale.x * 0.5, 1.0 - scale.x * 0.5, uFocus), mix(scale.y * 0.5, 1.0 - scale.y * 0.5, uFocusY));

  vec3 ink = mix(texture2D(uDraw, uv).rgb, vec3(1.0), uLighten);
  float t = uProgress;

  // phase 1: the line work draws itself on, sweeping left to right like a pen
  // over a faint pencil ghost (so the card is never blank before it starts)
  float a = 1.0 - pow(1.0 - clamp(t / 0.5, 0.0, 1.0), 2.0);
  float pen = vUv.x * 0.85 + fbm(uv * 7.0) * 0.15;
  float lines = 1.0 - smoothstep(a * 1.02 - 0.03, a * 1.02, pen);
  vec3 ghost = mix(vec3(1.0), ink, 0.14);
  vec3 lineArt = mix(ghost, ink, lines);

  // phase 2: the render washes in over the line work, rising from the bottom
  float b = smoothstep(0.42, 1.0, t);
  float n = fbm(uv * 2.2 + vec2(0.0, uTime * 0.02));
  float field = n * 0.3 + vUv.y * 0.7;
  float p = b * 1.1 - 0.04;
  float m = 1.0 - smoothstep(p - 0.06, p + 0.01, field);

  // cursor brush brings the render through early
  vec2 asp = vec2(uRes.x / uRes.y, 1.0);
  float d = distance(vUv * asp, uMouse * asp) + (n - 0.5) * 0.06;
  m = max(m, uBrush * (1.0 - smoothstep(0.06, 0.2, d)));

  vec3 col = mix(lineArt, texture2D(uPhoto, uv).rgb, m);
  // the ink lines stay on top of the render as it fills, then fade out
  col *= mix(vec3(1.0), ink, lines * (1.0 - b) * 0.85);
  float active = step(0.001, b) * (1.0 - step(0.995, b));
  float edge = 1.0 - smoothstep(0.0, 0.008, abs(field - p));
  col = mix(col, vec3(0.2196), edge * 0.1 * active);
  gl_FragColor = vec4(col, 1.0);
}`;

const load = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const img = new Image(); img.onload = () => res(img); img.onerror = rej; img.src = src;
});

const DrawingToRender = (props: Props) => {
  const { alt, lighten = 0.1, durationMs = 3800, className = '', small } = props;
  // pick the phone crop once, at mount
  const [isSmall] = useState(() => Boolean(small) && window.matchMedia('(max-width: 767px)').matches);
  const drawing = isSmall && small ? small.drawing : props.drawing;
  const render = isSmall && small ? small.render : props.render;
  const focusX = (isSmall ? small?.focusX : undefined) ?? props.focusX ?? 0.5;
  const focusY = (isSmall ? small?.focusY : undefined) ?? props.focusY ?? 0.5;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) { setFallback(true); return; }
    const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) { setFallback(true); return; }

    const sh = (type: number, src: string) => { const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s); return s; };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFallback(true); return; }
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const tex = (img: HTMLImageElement, unit: number, name: string) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, k, v);
      gl.uniform1i(u(name), unit);
    };

    let raf = 0, cancelled = false, start = -1, inView = false;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, brush: 0, last: -1e9 };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(u('uRes'), canvas.width, canvas.height);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width; mouse.ty = 1 - (e.clientY - r.top) / r.height; mouse.last = performance.now();
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { inView = true; io.disconnect(); } }, { rootMargin: '0px 0px -30% 0px' });

    Promise.all([load(drawing), load(render)]).then(([d, ph]) => {
      if (cancelled) return;
      tex(d, 0, 'uDraw'); tex(ph, 1, 'uPhoto');
      gl.uniform2f(u('uImg'), d.naturalWidth, d.naturalHeight);
      gl.uniform1f(u('uFocus'), focusX);
      gl.uniform1f(u('uFocusY'), focusY);
      gl.uniform1f(u('uLighten'), lighten);
      resize();
      window.addEventListener('resize', resize);
      canvas.addEventListener('pointermove', onMove);
      io.observe(wrap);
      const t0 = performance.now();
      const frame = (now: number) => {
        if (inView && start < 0) start = now;
        const t = start < 0 ? 0 : Math.min(1, (now - start) / durationMs);
        const progress = t; // phases ease themselves in the shader
        mouse.x += (mouse.tx - mouse.x) * 0.15; mouse.y += (mouse.ty - mouse.y) * 0.15;
        mouse.brush += ((now - mouse.last < 900 ? 1 : 0) - mouse.brush) * 0.08;
        gl.uniform1f(u('uProgress'), progress);
        gl.uniform1f(u('uTime'), (now - t0) / 1000);
        gl.uniform2f(u('uMouse'), mouse.x, mouse.y);
        gl.uniform1f(u('uBrush'), mouse.brush * (1 - progress));
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        // keep animating until done, then one last frame
        if (t < 1 || mouse.brush > 0.01) raf = requestAnimationFrame(frame);
        else raf = 0;
      };
      raf = requestAnimationFrame(frame);
      // restart the loop if the cursor comes back before the reveal finishes
      canvas.addEventListener('pointerenter', () => { if (!raf) raf = requestAnimationFrame(frame); });
    }).catch(() => setFallback(true));

    return () => {
      cancelled = true; cancelAnimationFrame(raf); io.disconnect();
      window.removeEventListener('resize', resize); canvas.removeEventListener('pointermove', onMove);
    };
  }, [drawing, render, focusX, focusY, lighten, durationMs]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {fallback
        ? <img src={render} alt={alt} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: `${focusX * 100}% ${(1 - focusY) * 100}%` }} />
        : <canvas ref={canvasRef} role="img" aria-label={alt} className="absolute inset-0 w-full h-full" />}
    </div>
  );
};

export default DrawingToRender;
