import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { projects } from '@/mocks/projects';

/*
  OBRAverse — an explorable isometric world.

  Layers (inside the camera-transformed "world"):
    base map → green shimmer → cloud shadows → walkers/cars (depth-sorted)
    → building overlays (depth-sorted) → night veil → night glows → birds → label

  The camera is translate+scale on the world div, driven by a rAF loop that
  eases toward a target. Drag pans, pinch / ctrl+wheel zooms toward the cursor,
  double-click zooms in. An intro flyover plays once per session, and a guided
  tour glides between the built projects.
*/

interface Building {
  slug: string;
  name: string;
  projectId?: string;
  left: number;
  top: number;
  width: number;
  height: number;
}

/* Listed in map draw order (back to front) — hit-testing picks the last match. */
const BUILDINGS: Building[] = [
  { slug: 'sibutad', name: 'Sibutad Park', left: 9.896, top: 67.855, width: 90.104, height: 32.145 },
  { slug: 'corpuz', name: 'Corpuz Residence', left: 39.151, top: 37.34, width: 28.979, height: 11.25 },
  { slug: 'canga', name: 'Canga Residence', left: 26.714, top: 52.174, width: 15.63, height: 9.328 },
  { slug: 'soria', name: 'Soria Residence', left: 63.672, top: 43.388, width: 29.964, height: 13.034 },
  { slug: 'loboc', name: 'LOBOC: House of Song', projectId: 'loboc-performing-arts', left: 13.771, top: 8.147, width: 48.594, height: 23.677 },
  { slug: 'suarez', name: 'Suarez Residence', left: 71.375, top: 29.528, width: 22.5, height: 10.649 },
  { slug: 'pnp', name: 'PNP Facility', projectId: 'pnp-facility', left: 4.172, top: 36.888, width: 26.875, height: 12.473 },
  { slug: 'fringe', name: 'Fringe House', projectId: 'fringe-house', left: 9.88, top: 59.728, width: 12.76, height: 8.462 },
  { slug: 'corazon', name: 'Casa Corazon', projectId: 'casa-corazon', left: 57.844, top: 57.524, width: 13.042, height: 9.515 },
  { slug: 'cebedo', name: 'Cebedo Farm House', projectId: 'cebedo-farm-house', left: 69.396, top: 64.798, width: 27.969, height: 10.679 },
  { slug: 'rah', name: 'RAH Seaside Hotel', projectId: 'rah-seaside-hotel', left: 9.844, top: 60.62, width: 53.016, height: 22.407 },
];

const projectById = (id?: string) => projects.find(p => p.id === id);

/** Downscaled alpha maps for per-pixel hover hit-testing. */
const HIT_SCALE = 0.25;

/* Walker routes: street centerlines detected from the artwork's road pixels
   (constant isometric slope 0.364, intercepts fitted for max on-road coverage). */
const ROUTES: [number, number][][] = [
  [[16, 69.33], [56, 54.77]], // street past Fringe up to the courts
  [[54.3, 48.45], [84.3, 37.53]], // street from Soria up toward Suarez
  [[40, 45.81], [76, 58.91]], // cross street from Corpuz down to Cebedo
];

interface MoverConfig {
  route: number;
  phase: number; // 0..2 starting position in the ping-pong cycle
  speed: number; // cycles per second
  size: number; // relative scale
  kind?: 'walker' | 'jogger' | 'dog';
}

const WALKERS: MoverConfig[] = [
  { route: 0, phase: 0.1, speed: 0.012, size: 1 },
  { route: 0, phase: 0.55, speed: 0.009, size: 0.95 },
  { route: 0, phase: 1.0, speed: 0.014, size: 1.05 },
  { route: 0, phase: 1.45, speed: 0.01, size: 0.9 },
  { route: 0, phase: 1.85, speed: 0.028, size: 1, kind: 'jogger' },
  { route: 0, phase: 0.32, speed: 0.007, size: 1, kind: 'dog' },
  { route: 1, phase: 0.25, speed: 0.011, size: 1 },
  { route: 1, phase: 0.75, speed: 0.013, size: 0.95 },
  { route: 1, phase: 1.25, speed: 0.01, size: 1.1 },
  { route: 1, phase: 1.7, speed: 0.026, size: 0.95, kind: 'jogger' },
  { route: 2, phase: 0.4, speed: 0.012, size: 1 },
  { route: 2, phase: 0.85, speed: 0.009, size: 0.95 },
  { route: 2, phase: 1.3, speed: 0.013, size: 1 },
  { route: 2, phase: 1.75, speed: 0.011, size: 1.05 },
];

/* Static figures doing things around the map. z is set per-spot:
   park figures sit above the park render and the vegetation layer. */
interface StaticFigure {
  x: number;
  y: number;
  z: number;
  kind: 'stretch' | 'exercise' | 'basketball';
  size: number;
}

/* Placed on light surfaces (courts, paths, paving) — black silhouettes vanish on lawn. */
const STATICS: StaticFigure[] = [
  { x: 55.2, y: 78.15, z: 1006, kind: 'exercise', size: 1 }, // on the volleyball court
  { x: 29.5, y: 86.0, z: 1006, kind: 'stretch', size: 1 }, // plaza by the entrance benches
  { x: 54.3, y: 81.7, z: 1006, kind: 'stretch', size: 0.9 }, // path by the flag circle
  { x: 58, y: 53.2, z: 532, kind: 'basketball', size: 1 }, // centre of the upper court
  { x: 34.6, y: 85.9, z: 1006, kind: 'exercise', size: 0.9 }, // path below the playground
];

/* Map aspect (1920x3049) — used so movers travel at constant apparent speed. */
const ASPECT = 3049 / 1920;

interface RoutePath {
  points: [number, number][];
  segLens: number[];
  total: number;
}

const ROUTE_PATHS: RoutePath[] = ROUTES.map(points => {
  const segLens = points.slice(1).map((p, i) => {
    const dx = p[0] - points[i][0];
    const dy = (p[1] - points[i][1]) * ASPECT;
    return Math.hypot(dx, dy);
  });
  return { points, segLens, total: segLens.reduce((a, b) => a + b, 0) };
});

/** Position along a polyline at normalized distance s (0..1). Returns [x%, y%, dx]. */
const pointAt = (path: RoutePath, s: number): [number, number, number] => {
  let d = s * path.total;
  for (let i = 0; i < path.segLens.length; i++) {
    if (d <= path.segLens[i] || i === path.segLens.length - 1) {
      const t = path.segLens[i] === 0 ? 0 : Math.min(1, d / path.segLens[i]);
      const [x1, y1] = path.points[i];
      const [x2, y2] = path.points[i + 1];
      return [x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, x2 - x1];
    }
    d -= path.segLens[i];
  }
  const last = path.points[path.points.length - 1];
  return [last[0], last[1], 1];
};

interface HitMap {
  data: Uint8ClampedArray;
  w: number;
  h: number;
}

interface Cam {
  x: number;
  y: number;
  s: number;
}

const TOUR_STOPS = ['loboc', 'pnp', 'fringe', 'sibutad', 'rah', 'corazon', 'cebedo'] as const;
const TOUR_DWELL_MS = 3400;

const ObraverseMap = () => {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const hitMapsRef = useRef<Record<string, HitMap>>({});
  const hoverRafRef = useRef<number | null>(null);
  const walkerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [active, setActive] = useState<string | null>(null);
  const [tourIndex, setTourIndex] = useState<number | null>(null);
  const [hintVisible, setHintVisible] = useState(true);
  const [stageInView, setStageInView] = useState(false);

  /* ------- camera ------- */
  const camRef = useRef<Cam>({ x: 0, y: 0, s: 1 });
  const targetRef = useRef<Cam>({ x: 0, y: 0, s: 1 });
  const stageSizeRef = useRef({ w: 1, h: 1 });
  const draggingRef = useRef(false);
  const movedRef = useRef(0);
  const pointersRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<{ dist: number; cx: number; cy: number } | null>(null);
  const tourRef = useRef<{ timer: ReturnType<typeof setTimeout> | null; active: boolean }>({ timer: null, active: false });

  const worldW = () => stageSizeRef.current.w;
  const worldH = () => stageSizeRef.current.w * ASPECT;
  /* The stage box has the map's aspect ratio, so scale 1 shows the whole map. */
  const fitScale = () => 1;
  const maxScale = () => Math.max(1.6, 3840 / stageSizeRef.current.w);

  const clampCam = (c: Cam): Cam => {
    const { w: sw, h: sh } = stageSizeRef.current;
    const s = Math.min(maxScale(), Math.max(fitScale(), c.s));
    const ww = worldW() * s;
    const wh = worldH() * s;
    const x = ww <= sw ? (sw - ww) / 2 : Math.min(0, Math.max(sw - ww, c.x));
    const y = wh <= sh ? (sh - wh) / 2 : Math.min(0, Math.max(sh - wh, c.y));
    return { x, y, s };
  };

  /** Camera that centers world-percent point (cx, cy) at zoom s. */
  const camFor = (cx: number, cy: number, s: number): Cam => {
    const { w: sw, h: sh } = stageSizeRef.current;
    return clampCam({
      x: sw / 2 - (cx / 100) * worldW() * s,
      y: sh / 2 - (cy / 100) * worldH() * s,
      s,
    });
  };

  const zoomAt = useCallback((clientX: number, clientY: number, factor: number) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const t = targetRef.current;
    const s = Math.min(maxScale(), Math.max(fitScale(), t.s * factor));
    const k = s / t.s;
    targetRef.current = clampCam({ x: px - (px - t.x) * k, y: py - (py - t.y) * k, s });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Main camera loop: ease toward target, write transform + inverse-scale var. */
  useEffect(() => {
    let raf: number;
    const loop = () => {
      const cam = camRef.current;
      const t = targetRef.current;
      const f = draggingRef.current ? 1 : 0.16;
      cam.x += (t.x - cam.x) * f;
      cam.y += (t.y - cam.y) * f;
      cam.s += (t.s - cam.s) * f;
      if (Math.abs(t.x - cam.x) < 0.1) cam.x = t.x;
      if (Math.abs(t.y - cam.y) < 0.1) cam.y = t.y;
      if (Math.abs(t.s - cam.s) < 0.0005) cam.s = t.s;
      const world = worldRef.current;
      if (world) {
        world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.s})`;
        world.style.setProperty('--inv', String(1 / cam.s));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Stage sizing */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const measure = () => {
      stageSizeRef.current = { w: stage.clientWidth, h: stage.clientHeight };
      const world = worldRef.current;
      if (world) world.style.width = stage.clientWidth + 'px';
      targetRef.current = clampCam(targetRef.current);
    };
    measure();
    // default view: whole city
    targetRef.current = camFor(50, 50, fitScale());
    camRef.current = { ...targetRef.current };
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Show floating controls only while the map is on screen */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const obs = new IntersectionObserver(
      entries => setStageInView(entries[0].isIntersecting),
      { threshold: 0.12 }
    );
    obs.observe(stage);
    return () => obs.disconnect();
  }, []);

  /* ------- guided tour ------- */
  const stopTour = useCallback((zoomOut = true) => {
    const t = tourRef.current;
    t.active = false;
    if (t.timer) clearTimeout(t.timer);
    t.timer = null;
    setTourIndex(null);
    setActive(null);
    if (zoomOut) targetRef.current = camFor(50, 50, fitScale());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTour = () => {
    const t = tourRef.current;
    t.active = true;
    const visit = (i: number) => {
      if (!tourRef.current.active) return;
      if (i >= TOUR_STOPS.length) return stopTour();
      const b = BUILDINGS.find(x => x.slug === TOUR_STOPS[i])!;
      setTourIndex(i);
      setActive(b.slug);
      const cy = b.top + b.height / 2;
      targetRef.current = camFor(b.left + b.width / 2, cy, 1.3);
      // the stage is taller than the viewport — scroll the page so the stop is centered
      const stage = stageRef.current;
      if (stage) {
        const stageTop = stage.getBoundingClientRect().top + window.scrollY;
        const pointY = targetRef.current.y + (cy / 100) * worldH() * targetRef.current.s;
        window.scrollTo({ top: stageTop + pointY - window.innerHeight / 2, behavior: 'smooth' });
      }
      tourRef.current.timer = setTimeout(() => visit(i + 1), TOUR_DWELL_MS);
    };
    visit(0);
  };

  useEffect(() => () => stopTour(false), [stopTour]);

  /* ------- hit-testing ------- */
  useEffect(() => {
    let cancelled = false;
    BUILDINGS.forEach(b => {
      const img = new Image();
      img.src = `/images/obraverse/buildings/${b.slug}.webp`;
      img.onload = () => {
        if (cancelled) return;
        const w = Math.max(1, Math.round(img.naturalWidth * HIT_SCALE));
        const h = Math.max(1, Math.round(img.naturalHeight * HIT_SCALE));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);
        hitMapsRef.current[b.slug] = { data: ctx.getImageData(0, 0, w, h).data, w, h };
      };
    });
    return () => { cancelled = true; };
  }, []);

  const hitTest = (clientX: number, clientY: number): string | null => {
    const world = worldRef.current;
    if (!world) return null;
    const rect = world.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * 100;
    const py = ((clientY - rect.top) / rect.height) * 100;
    let found: string | null = null;
    for (const b of BUILDINGS) {
      if (px < b.left || px > b.left + b.width || py < b.top || py > b.top + b.height) continue;
      const map = hitMapsRef.current[b.slug];
      if (!map) continue;
      const lx = Math.min(map.w - 1, Math.floor(((px - b.left) / b.width) * map.w));
      const ly = Math.min(map.h - 1, Math.floor(((py - b.top) / b.height) * map.h));
      if (map.data[(ly * map.w + lx) * 4 + 3] > 40) found = b.slug;
    }
    return found;
  };

  /* ------- pointer input ------- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (tourRef.current.active) stopTour(false);
    const stage = stageRef.current;
    if (!stage) return;
    stage.setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    movedRef.current = 0;
    if (pointersRef.current.size === 1) {
      draggingRef.current = true;
    } else if (pointersRef.current.size === 2) {
      const [a, b] = [...pointersRef.current.values()];
      pinchRef.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
      draggingRef.current = false;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointersRef.current.get(e.pointerId);
    if (prev) {
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointersRef.current.size === 2 && pinchRef.current) {
        const [a, b] = [...pointersRef.current.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2;
        const p = pinchRef.current;
        if (p.dist > 0) zoomAt(cx, cy, dist / p.dist);
        const t = targetRef.current;
        targetRef.current = clampCam({ x: t.x + cx - p.cx, y: t.y + cy - p.cy, s: t.s });
        pinchRef.current = { dist, cx, cy };
        movedRef.current += 10;
        return;
      }
      if (draggingRef.current) {
        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;
        movedRef.current += Math.abs(dx) + Math.abs(dy);
        const t = targetRef.current;
        targetRef.current = clampCam({ x: t.x + dx, y: t.y + dy, s: t.s });
      }
    }
    // hover (mouse only, not while dragging)
    if (e.pointerType === 'mouse' && !draggingRef.current) {
      const { clientX, clientY } = e;
      if (hoverRafRef.current !== null) return;
      hoverRafRef.current = requestAnimationFrame(() => {
        hoverRafRef.current = null;
        if (!tourRef.current.active) setActive(hitTest(clientX, clientY));
      });
    }
  };

  const endPointer = (e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;
    if (pointersRef.current.size === 0) draggingRef.current = false;
  };

  const onClick = (e: React.MouseEvent) => {
    if (movedRef.current > 6) return;
    const slug = hitTest(e.clientX, e.clientY);
    const b = BUILDINGS.find(x => x.slug === slug);
    if (b?.projectId) navigate(`/projects/${b.projectId}`);
  };

  /* Wheel: pinch-trackpad / ctrl+wheel zooms; plain wheel scrolls the page. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let hintTimer: ReturnType<typeof setTimeout> | null = null;
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (tourRef.current.active) stopTour(false);
        zoomAt(e.clientX, e.clientY, Math.pow(1.0015, -e.deltaY * 2));
      } else {
        setHintVisible(true);
        if (hintTimer) clearTimeout(hintTimer);
        hintTimer = setTimeout(() => setHintVisible(false), 2200);
      }
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      if (hintTimer) clearTimeout(hintTimer);
    };
  }, [stopTour, zoomAt]);

  /* Initial hint fade */
  useEffect(() => {
    const t = setTimeout(() => setHintVisible(false), 4500);
    return () => clearTimeout(t);
  }, []);

  /* ------- movers (walkers + cars) ------- */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf: number;
    const drive = (now: number, configs: MoverConfig[], refs: (HTMLDivElement | null)[]) => {
      configs.forEach((m, i) => {
        const el = refs[i];
        if (!el) return;
        const path = ROUTE_PATHS[m.route];
        const cycle = (m.phase + (now / 1000) * m.speed * 2) % 2;
        const s = cycle < 1 ? cycle : 2 - cycle;
        const dir = cycle < 1 ? 1 : -1;
        const [x, y, dx] = pointAt(path, s);
        el.style.left = x + '%';
        el.style.top = y + '%';
        el.style.zIndex = String(Math.round(y * 10));
        const facing = dx * dir < 0 ? -1 : 1;
        el.style.transform = `translate(-50%, -100%) scaleX(${facing}) scale(${m.size})`;
      });
    };
    const tick = (now: number) => {
      drive(now, WALKERS, walkerRefs.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const activeBuilding = BUILDINGS.find(b => b.slug === active) ?? null;
  const activeProject = projectById(activeBuilding?.projectId);
  const tourStop = tourIndex !== null;

  return (
    <div
      ref={stageRef}
      className="absolute inset-0 overflow-hidden select-none isolate z-0 bg-white"
      style={{
        cursor: activeBuilding?.projectId ? 'pointer' : 'grab',
        touchAction: 'pan-y',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onPointerLeave={e => { endPointer(e); setActive(null); }}
      onClick={onClick}
      onDoubleClick={e => zoomAt(e.clientX, e.clientY, 1.7)}
    >
      {/* ---------- world (camera-transformed) ---------- */}
      <div
        ref={worldRef}
        className="absolute left-0 top-0 will-change-transform"
        style={{ transformOrigin: '0 0' }}
      >
        <div>
          <img
            src="/images/obraverse/base.webp"
            alt="OBRAverse map"
            className="w-full h-auto block"
            draggable={false}
          />

          {/* Living green layer — vegetation breathing over the base.
              Sits above the walkers so roadside trees occlude them correctly. */}
          <img
            src="/images/obraverse/trees.webp"
            alt=""
            aria-hidden="true"
            draggable={false}
            className="obraverse-trees absolute left-0 top-0 w-full h-auto pointer-events-none"
            style={{ zIndex: 1005 }}
          />

          {/* Drifting cloud shadows */}
          {[0, 1, 2].map(i => (
            <div
              key={i}
              aria-hidden="true"
              className="obraverse-cloud absolute pointer-events-none"
              style={{
                width: '42%',
                height: '18%',
                top: `${[8, 42, 70][i]}%`,
                zIndex: 1100,
                animationDuration: `${[150, 195, 170][i]}s`,
                animationDelay: `${[0, -60, -110][i]}s`,
              }}
            />
          ))}

          {/* Tiny black figures strolling the streets */}
          {WALKERS.map((w, i) => (
            <div
              key={i}
              ref={el => { walkerRefs.current[i] = el; }}
              className="absolute pointer-events-none"
              style={{ width: w.kind === 'dog' ? '0.85%' : '0.4%', opacity: 0.85 }}
            >
              <div className={w.kind === 'dog' ? 'flex items-end gap-[18%]' : undefined}>
                <svg
                  viewBox="0 0 10 22"
                  className={`obraverse-walker h-auto ${w.kind === 'jogger' ? 'obraverse-walker--fast' : ''} ${w.kind === 'dog' ? 'w-[47%]' : 'w-full'}`}
                  style={{ animationDelay: `${(i * 0.37) % 0.7}s` }}
                >
                  <circle cx="5" cy="3" r="2.6" fill="#222" />
                  <path d="M5 5.5 C 3.4 6.2 3 8 3 10.5 L 3.6 13 L 6.4 13 L 7 10.5 C 7 8 6.6 6.2 5 5.5 Z" fill="#222" />
                  <line className="obraverse-leg-a" x1="4" y1="13" x2="3.4" y2="20.5" stroke="#222" strokeWidth="1.7" strokeLinecap="round" />
                  <line className="obraverse-leg-b" x1="6" y1="13" x2="6.6" y2="20.5" stroke="#222" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
                {w.kind === 'dog' && (
                  <svg viewBox="0 0 20 12" className="w-[38%] h-auto">
                    <rect x="4.5" y="4.2" width="10.5" height="3.6" rx="1.8" fill="#222" />
                    <circle cx="16.2" cy="3.8" r="2" fill="#222" />
                    <path d="M17 2.2 L18.2 0.8 L18.6 2.6 Z" fill="#222" />
                    <line className="obraverse-leg-a" x1="6.5" y1="7.5" x2="6.2" y2="11.2" stroke="#222" strokeWidth="1.3" strokeLinecap="round" />
                    <line className="obraverse-leg-b" x1="13" y1="7.5" x2="13.3" y2="11.2" stroke="#222" strokeWidth="1.3" strokeLinecap="round" />
                    <line className="obraverse-tail" x1="4.5" y1="5" x2="1.8" y2="2.6" stroke="#222" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                )}
              </div>
            </div>
          ))}

          {/* Static figures — exercising, stretching, shooting hoops */}
          {STATICS.map((f, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                left: `${f.x}%`,
                top: `${f.y}%`,
                width: '0.78%',
                zIndex: f.z,
                opacity: 0.95,
                transform: `translate(-50%, -100%) scale(${f.size})`,
                transformOrigin: '50% 100%',
              }}
            >
              {f.kind === 'stretch' && (
                <svg viewBox="0 0 14 24" className="obraverse-sway w-full h-auto" style={{ animationDelay: `${i * 0.8}s` }}>
                  <circle cx="7" cy="4" r="2.4" fill="#222" />
                  <path d="M7 6.5 C 5.6 7 5.2 9 5.3 11.5 L 5.8 14 L 8.2 14 L 8.7 11.5 C 8.8 9 8.4 7 7 6.5 Z" fill="#222" />
                  <line x1="7" y1="8" x2="3.2" y2="2.2" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="7" y1="8" x2="10.8" y2="2.2" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="6.1" y1="14" x2="5.7" y2="21.5" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="7.9" y1="14" x2="8.3" y2="21.5" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
              )}
              {f.kind === 'exercise' && (
                <svg viewBox="0 0 16 24" className="obraverse-hop w-full h-auto" style={{ animationDelay: `${i * 0.35}s` }}>
                  <circle cx="8" cy="3.8" r="2.4" fill="#222" />
                  <path d="M8 6.3 C 6.6 6.8 6.2 8.8 6.3 11.3 L 6.8 13.8 L 9.2 13.8 L 9.7 11.3 C 9.8 8.8 9.4 6.8 8 6.3 Z" fill="#222" />
                  <line x1="8" y1="8" x2="2.6" y2="6" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="8" y1="8" x2="13.4" y2="6" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="6.9" y1="13.8" x2="5.6" y2="21.3" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  <line x1="9.1" y1="13.8" x2="10.4" y2="21.3" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
              )}
              {f.kind === 'basketball' && (
                <svg viewBox="0 0 18 24" className="w-full h-auto">
                  <g className="obraverse-dribble">
                    <circle cx="7" cy="4" r="2.4" fill="#222" />
                    <path d="M7 6.5 C 5.6 7 5.2 9 5.3 11.5 L 5.8 14 L 8.2 14 L 8.7 11.5 C 8.8 9 8.4 7 7 6.5 Z" fill="#222" />
                    <line x1="7" y1="8" x2="12.6" y2="13.4" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                    <line x1="7" y1="8" x2="3.6" y2="12.6" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                    <line x1="6.1" y1="14" x2="5.2" y2="21.5" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                    <line x1="7.9" y1="14" x2="9" y2="21.5" stroke="#222" strokeWidth="2.1" strokeLinecap="round" />
                  </g>
                  <circle className="obraverse-ball" cx="13.4" cy="20.4" r="1.8" fill="#222" />
                </svg>
              )}
            </div>
          ))}

          {/* Depth-sorted building overlays, each with a soft halo that breathes on hover */}
          {BUILDINGS.map(b => {
            const isActive = active === b.slug;
            const z = Math.round((b.top + b.height) * 10);
            return (
              <div key={b.slug}>
                {/* halo: the building's own silhouette, darkened, blurred and slightly enlarged */}
                <img
                  src={`/images/obraverse/buildings/${b.slug}.webp`}
                  alt=""
                  aria-hidden="true"
                  draggable={false}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${b.left}%`,
                    top: `${b.top}%`,
                    width: `${b.width}%`,
                    height: `${b.height}%`,
                    zIndex: isActive ? 1011 : z - 1,
                    filter: 'brightness(0) blur(9px)',
                    transform: 'scale(1.05)',
                    transformOrigin: '50% 60%',
                    opacity: isActive ? 0.34 : 0,
                    transition: 'opacity 0.3s ease',
                    animation: isActive ? 'obraverse-halo 1.6s ease-in-out 0.3s infinite alternate' : 'none',
                  }}
                />
                <img
                  src={`/images/obraverse/buildings/${b.slug}.webp`}
                  alt={b.name}
                  draggable={false}
                  className="absolute pointer-events-none"
                  style={{
                    left: `${b.left}%`,
                    top: `${b.top}%`,
                    width: `${b.width}%`,
                    height: `${b.height}%`,
                    zIndex: isActive ? 1012 : z,
                    filter: isActive
                      ? 'brightness(1.12) saturate(1.25) contrast(1.04) drop-shadow(0 14px 22px rgba(56,56,56,0.5))'
                      : 'none',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </div>
            );
          })}

        </div>

        {/* Theatre spotlight: everything but the hovered building dims softly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-black"
          style={{
            zIndex: 1010,
            opacity: active ? 0.13 : 0,
            transition: 'opacity 0.35s ease',
          }}
        />

        {/* Soft white clouds floating over the city */}
        {[0, 1, 2].map(i => (
          <div
            key={i}
            aria-hidden="true"
            className="obraverse-whitecloud absolute pointer-events-none"
            style={{
              width: `${[30, 22, 26][i]}%`,
              height: `${[11, 8, 9][i]}%`,
              top: `${[10, 38, 66][i]}%`,
              zIndex: 1250,
              opacity: [0.6, 0.45, 0.55][i],
              animationDuration: `${[110, 150, 130][i]}s`,
              animationDelay: `${[0, -70, -35][i]}s`,
            }}
          />
        ))}

        {/* Birds crossing the sky */}
        {[0, 1, 2, 3, 4].map(i => (
          <svg
            key={i}
            aria-hidden="true"
            viewBox="0 0 60 20"
            className="obraverse-birds absolute pointer-events-none"
            style={{
              width: `${[3, 2.4, 3.4, 2.7, 3][i]}%`,
              top: `${[14, 30, 47, 63, 80][i]}%`,
              zIndex: 1300,
              animationDuration: `${[48, 70, 60, 84, 55][i]}s`,
              animationDelay: `${[6, -30, -12, -55, -44][i]}s`,
            }}
          >
            <path d="M4 10 Q 8 6 12 10 Q 16 6 20 10" stroke="#3a3a3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M28 6 Q 32 2 36 6 Q 40 2 44 6" stroke="#3a3a3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M38 14 Q 42 10 46 14 Q 50 10 54 14" stroke="#3a3a3a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
          </svg>
        ))}

        {/* Floating card (hover or tour) — counter-scaled to stay constant size */}
        {activeBuilding && (
          <div
            className="absolute pointer-events-none"
            style={{
              zIndex: 2000,
              left: `${activeBuilding.left + activeBuilding.width / 2}%`,
              top: `${activeBuilding.top + (tourStop ? activeBuilding.height * 0.42 : 0)}%`,
              transform: 'translate(-50%, -108%) scale(var(--inv, 1))',
              transformOrigin: '50% 100%',
              animation: 'obraverse-label-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            <div className="relative bg-[#383838] shadow-[0_14px_34px_rgba(0,0,0,0.4)] text-center whitespace-nowrap rounded-sm overflow-hidden">
              {activeProject?.imageUrl && (
                <img
                  src={activeProject.imageUrl}
                  alt=""
                  className="block w-52 h-28 object-cover"
                  draggable={false}
                />
              )}
              <div className="px-5 py-3">
                <div
                  className="text-[13px] md:text-[15px] text-white tracking-[0.5px]"
                  style={{ fontFamily: 'var(--font-serif)' }}
                >
                  {activeBuilding.name}
                </div>
                {activeProject ? (
                  <div
                    className="mt-1 text-[9px] tracking-[2.5px] text-[#c8c7c6]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {tourStop
                      ? `${activeProject.location.toUpperCase()} · ${activeProject.year}`
                      : 'VIEW PROJECT →'}
                  </div>
                ) : (
                  <div
                    className="mt-1 text-[9px] tracking-[2.5px] text-[#909090]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    OBRAVERSE
                  </div>
                )}
              </div>
            </div>
            <div className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rotate-45 bg-[#383838]" />
          </div>
        )}
      </div>

      {/* ---------- screen-space UI ---------- */}

      {/* hint pill */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
        style={{ opacity: hintVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}
      >
        <div
          className="bg-[#383838]/85 backdrop-blur-sm text-white text-[10px] tracking-[2px] px-5 py-2 rounded-full"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          DRAG TO EXPLORE &middot; PINCH OR &#8984;+SCROLL TO ZOOM
        </div>
      </div>

      {/* controls: zoom (fixed to viewport while the map is on screen) */}
      {stageInView && (
        <div className="fixed bottom-6 right-6 z-20 flex flex-col gap-2">
          {[
            { label: '+', title: 'Zoom in', onClick: () => { const r = stageRef.current!.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1.45); } },
            { label: '−', title: 'Zoom out', onClick: () => { const r = stageRef.current!.getBoundingClientRect(); zoomAt(r.left + r.width / 2, r.top + r.height / 2, 1 / 1.45); } },
          ].map(btn => (
            <button
              key={btn.label}
              title={btn.title}
              onClick={e => { e.stopPropagation(); btn.onClick(); }}
              onPointerDown={e => e.stopPropagation()}
              className="w-10 h-10 rounded-full bg-white/90 border border-[#e4e3e2] text-[#383838] text-[16px] leading-none shadow-sm hover:bg-white transition-colors cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>
      )}

      {/* tour control */}
      {stageInView && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20">
          {tourStop ? (
            <div className="flex items-center gap-3 bg-[#383838]/90 backdrop-blur-sm rounded-full pl-5 pr-2 py-2">
              <div className="flex items-center gap-[6px]">
                {TOUR_STOPS.map((_, i) => (
                  <span
                    key={i}
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: i === tourIndex ? '#fff' : 'rgba(255,255,255,0.35)' }}
                  />
                ))}
              </div>
              <button
                onClick={e => { e.stopPropagation(); stopTour(); }}
                onPointerDown={e => e.stopPropagation()}
                className="w-7 h-7 rounded-full bg-white/15 text-white text-[11px] leading-none hover:bg-white/30 transition-colors cursor-pointer"
                title="End tour"
              >
                &#10005;
              </button>
            </div>
          ) : (
            <button
              onClick={e => { e.stopPropagation(); startTour(); }}
              onPointerDown={e => e.stopPropagation()}
              className="bg-[#383838] text-white text-[10px] tracking-[3px] px-7 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:bg-[#222] transition-colors cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              &#9654;&nbsp;&nbsp;TOUR THE OBRAVERSE
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes obraverse-label-in {
          from { opacity: 0; margin-top: 6px; }
          to { opacity: 1; margin-top: 0; }
        }
        .obraverse-trees {
          filter: brightness(1.05) saturate(1.25);
          -webkit-mask-image: repeating-linear-gradient(115deg, rgba(0,0,0,0.15) 0px, #000 140px, rgba(0,0,0,0.15) 280px);
          mask-image: repeating-linear-gradient(115deg, rgba(0,0,0,0.15) 0px, #000 140px, rgba(0,0,0,0.15) 280px);
          animation: obraverse-wind 26s linear infinite, obraverse-breathe 9s ease-in-out infinite alternate;
        }
        @keyframes obraverse-wind {
          from { -webkit-mask-position: 0px 0; mask-position: 0px 0; }
          to { -webkit-mask-position: 309px 0; mask-position: 309px 0; }
        }
        @keyframes obraverse-breathe {
          from { opacity: 0.78; }
          to { opacity: 1; }
        }
        .obraverse-cloud {
          background: radial-gradient(ellipse at center, rgba(30,35,30,0.14) 0%, rgba(30,35,30,0.07) 45%, transparent 70%);
          mix-blend-mode: multiply;
          animation-name: obraverse-cloud-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes obraverse-cloud-drift {
          from { transform: translateX(-120%); }
          to { transform: translateX(360%); }
        }
        .obraverse-whitecloud {
          background:
            radial-gradient(ellipse 55% 55% at 35% 55%, rgba(255,255,255,0.95) 0%, transparent 68%),
            radial-gradient(ellipse 45% 50% at 62% 42%, rgba(255,255,255,0.8) 0%, transparent 70%),
            radial-gradient(ellipse 38% 42% at 80% 58%, rgba(255,255,255,0.7) 0%, transparent 72%);
          filter: blur(4px);
          animation-name: obraverse-cloud-drift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .obraverse-birds {
          animation-name: obraverse-bird-fly;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes obraverse-bird-fly {
          from { transform: translate(-300%, 40%); }
          to { transform: translate(3600%, -160%); }
        }
        .obraverse-walker { animation: obraverse-bob 0.7s ease-in-out infinite alternate; }
        .obraverse-walker .obraverse-leg-a { animation: obraverse-step-a 0.7s ease-in-out infinite alternate; transform-origin: 5px 13px; }
        .obraverse-walker .obraverse-leg-b { animation: obraverse-step-b 0.7s ease-in-out infinite alternate; transform-origin: 5px 13px; }
        .obraverse-walker--fast, .obraverse-walker--fast .obraverse-leg-a, .obraverse-walker--fast .obraverse-leg-b { animation-duration: 0.38s; }
        @keyframes obraverse-halo {
          from { opacity: 0.26; }
          to { opacity: 0.42; }
        }
        .obraverse-tail { animation: obraverse-wag 0.45s ease-in-out infinite alternate; transform-origin: 4.5px 5px; }
        @keyframes obraverse-wag {
          from { transform: rotate(-12deg); }
          to { transform: rotate(16deg); }
        }
        .obraverse-sway { animation: obraverse-sway-kf 3.2s ease-in-out infinite alternate; transform-origin: 50% 100%; }
        @keyframes obraverse-sway-kf {
          from { transform: rotate(-6deg); }
          to { transform: rotate(6deg); }
        }
        .obraverse-hop { animation: obraverse-hop-kf 0.55s ease-in-out infinite alternate; }
        @keyframes obraverse-hop-kf {
          from { transform: translateY(0); }
          to { transform: translateY(-7%); }
        }
        .obraverse-dribble { animation: obraverse-hop-kf 0.5s ease-in-out infinite alternate; }
        .obraverse-ball { animation: obraverse-ball-kf 0.5s cubic-bezier(0.55, 0, 0.85, 1) infinite alternate; }
        @keyframes obraverse-ball-kf {
          from { transform: translateY(-14%); }
          to { transform: translateY(0); }
        }
        @keyframes obraverse-bob {
          from { transform: translateY(0); }
          to { transform: translateY(-4%); }
        }
        @keyframes obraverse-step-a {
          from { transform: rotate(14deg); }
          to { transform: rotate(-14deg); }
        }
        @keyframes obraverse-step-b {
          from { transform: rotate(-14deg); }
          to { transform: rotate(14deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .obraverse-trees, .obraverse-cloud, .obraverse-whitecloud, .obraverse-birds,
          .obraverse-walker, .obraverse-walker line, .obraverse-sway, .obraverse-hop,
          .obraverse-dribble, .obraverse-ball, .obraverse-tail { animation: none !important; }
        }
      `}</style>

      {/* Accessible link list for keyboard / screen-reader users */}
      <nav className="sr-only" aria-label="Projects on the OBRAverse map">
        <ul>
          {BUILDINGS.filter(b => b.projectId).map(b => (
            <li key={b.slug}>
              <Link to={`/projects/${b.projectId}`}>{b.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ObraverseMap;
