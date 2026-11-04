import { projects } from '@/mocks/projects';

// Flagship projects for the home hero slideshow, in order. The "Selected work"
// grid shows everything else, so no project appears twice on the page.
const HERO_IDS = [
  'loboc-performing-arts',
  's-residence',
  'rah-seaside-hotel',
  'katipunan-bank',
  'lim-beach-house',
  'bakley-rotonda',
  'pnp-facility',
  'casa-dajuela',
  'okd-medical-center',
  'fringe-house',
];

export const heroProjects = HERO_IDS
  .map(id => projects.find(p => p.id === id))
  .filter((p): p is (typeof projects)[number] => Boolean(p));

export const gridProjects = projects.filter(p => !HERO_IDS.includes(p.id));
