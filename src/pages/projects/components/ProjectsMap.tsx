import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Project } from '@/mocks/projects';
import { PLACES, placeOf } from '@/mocks/places';
import { sizedImage } from '@/components/base/sizedImage';

interface Props {
  projects: Project[];
}

// One pin per place (with a project count); the popup lists that place's
// projects. Greyscale tiles so the map sits inside the brand palette.
const ProjectsMap = ({ projects }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!elRef.current || mapRef.current) return;
    const map = L.map(elRef.current, {
      center: [9.0, 123.6],
      zoom: 8,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
      className: 'om-tiles',
    }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;
    return () => { map.remove(); mapRef.current = null; };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();

    const byPlace = new Map<string, Project[]>();
    projects.forEach(p => {
      const place = placeOf(p.location);
      if (!place) return;
      byPlace.set(place, [...(byPlace.get(place) ?? []), p]);
    });

    const bounds: L.LatLngTuple[] = [];
    const markers: L.Marker[] = [];
    byPlace.forEach((list, place) => {
      const { lat, lng } = PLACES[place];
      bounds.push([lat, lng]);
      const icon = L.divIcon({
        className: '',
        html: `<div class="om-pin"><span>${list.length}</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      });
      const marker = L.marker([lat, lng], { icon, title: place }).addTo(layer);
      markers.push(marker);
      const html = `
        <div class="om-pop">
          <p class="om-pop-place">${place}</p>
          ${list.map(p => `
            <a href="/projects/${p.id}" data-id="${p.id}" class="om-pop-item">
              <img src="${sizedImage(p.imageUrl)}" alt="" />
              <span><strong>${p.title}</strong><em>${p.typology} · ${p.year}</em></span>
            </a>`).join('')}
        </div>`;
      marker.bindPopup(html, { closeButton: false, minWidth: 240, maxWidth: 280, offset: [0, -14] });
    });

    // narrower padding on phones so the pins get a closer zoom and don't stack
    const pad = Math.round(Math.min(80, (elRef.current?.clientWidth ?? 800) * 0.1));
    if (bounds.length > 1) map.fitBounds(bounds, { padding: [pad, pad], maxZoom: 10 });
    else if (bounds.length === 1) map.setView(bounds[0], 11);

    // Towns a few km apart (Dipolog / Katipunan) stack at the zoom a phone can
    // fit; nudge any pins closer than a pin's width apart so each stays tappable.
    const MIN_GAP = 48;
    const spread = () => {
      const pts = markers.map(m => map.latLngToContainerPoint(m.getLatLng()));
      const off = pts.map(() => ({ x: 0, y: 0 }));
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[j].x - pts[i].x;
          const dy = pts[j].y - pts[i].y;
          const dist = Math.hypot(dx, dy);
          if (dist >= MIN_GAP) continue;
          const [ux, uy] = dist > 0 ? [dx / dist, dy / dist] : [1, 0];
          const push = (MIN_GAP - dist) / 2;
          off[i].x -= ux * push; off[i].y -= uy * push;
          off[j].x += ux * push; off[j].y += uy * push;
        }
      }
      markers.forEach((m, i) => {
        const pin = m.getElement()?.firstElementChild as HTMLElement | null;
        if (pin) pin.style.translate = `${off[i].x.toFixed(1)}px ${off[i].y.toFixed(1)}px`;
      });
    };
    spread();
    map.on('zoomend', spread);
    return () => { map.off('zoomend', spread); };
  }, [projects]);

  // popup links navigate inside the app instead of reloading the page
  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a.om-pop-item');
      if (!a) return;
      e.preventDefault();
      navigate(`/projects/${a.dataset.id}`);
    };
    el.addEventListener('click', onClick);
    return () => el.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div className="relative isolate">
      <div ref={elRef} className="w-full h-[70svh] md:h-[78vh] bg-[#e4e3e2]" />
      <style>{`
        .om-tiles { filter: grayscale(1) contrast(0.9) brightness(1.06); }
        .om-pin { width: 36px; height: 36px; border-radius: 9999px; background: #383838; color: #fff;
          display: flex; align-items: center; justify-content: center; font: 700 13px Nexa, sans-serif;
          box-shadow: 0 0 0 6px rgba(56,56,56,0.18); transition: transform .2s ease; }
        .om-pin:hover { transform: scale(1.1); }
        .leaflet-popup-content-wrapper { border-radius: 2px; box-shadow: 0 12px 30px rgba(56,56,56,0.25); }
        .leaflet-popup-content { margin: 14px; }
        .leaflet-popup-tip { box-shadow: none; }
        .om-pop-place { font: 700 11px Nexa, sans-serif; letter-spacing: 2px; text-transform: uppercase; color: #797979; margin: 0 0 10px; }
        .leaflet-container a.om-pop-item { color: #383838; }
        .leaflet-container .leaflet-control-attribution a { color: #797979; }
        .leaflet-attribution-flag { display: none !important; }
        .om-pop-item { display: flex; gap: 10px; align-items: center; padding: 6px 0; border-top: 1px solid #e4e3e2; color: #383838; text-decoration: none; }
        .om-pop-item img { width: 64px; height: 44px; object-fit: cover; flex: none; }
        .om-pop-item strong { display: block; font: 700 13px Nexa, sans-serif; }
        .om-pop-item em { display: block; font: 300 11px Nexa, sans-serif; font-style: normal; color: #797979; letter-spacing: 1px; text-transform: uppercase; margin-top: 2px; }
        .leaflet-container a.om-pop-item:hover strong { color: #797979; }
        .leaflet-control-zoom a { color: #383838 !important; }
      `}</style>
    </div>
  );
};

export default ProjectsMap;
