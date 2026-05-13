export type NewsCategory = 'Recognition' | 'Event' | 'Awards' | 'Talk';

export interface NewsItem {
  id: string;
  category: NewsCategory;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  url?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'house-of-song-loboc',
    category: 'Recognition',
    date: 'NOV 3, 2024',
    title: 'House of Song: Loboc Performing Arts Center by Obra Majoralia Design Studio',
    excerpt: 'Kanto features the studio\'s winning design for the Loboc Performing Arts Center — a project that weaves classical architecture with local heritage from the bahay na bato and Loboc Church to serve the Loboc Children\'s Choir and support post-earthquake community recovery.',
    imageUrl: 'https://kanto.ph/wp-content/uploads/2024/11/Obra-Majoralia-Loboc-Performing-Arts-Center-Kanto.PH-Creative-Corners-World-Architecture-Festival-WAF-2024-Shortlisted-GROHE-Young-Visionary17-scaled.jpg',
    url: 'https://kanto.ph/spaces/loboc-performing-arts-center-obra-majoralia/',
  },
  {
    id: 'waf-2024-new-talent',
    category: 'Recognition',
    date: 'OCT 19, 2024',
    title: 'World Architecture Festival 2024: Celebrating New Talent and Global Excellence',
    excerpt: 'Manila Bulletin highlights eight Filipino projects shortlisted for WAF 2024 in Singapore — among them the Loboc Performing Arts Center, representing a new wave of internationally recognized Philippine architecture.',
    imageUrl: 'https://mb.com.ph/uploads/imported_images/jpeg_optimizer_Main_photo_6d54fb3667.jpg',
    url: 'https://mb.com.ph/2024/10/19/world-architecture-festival-2024-celebrating-new-talent-global-excellence',
  },
  {
    id: 'waf-2024-day-two',
    category: 'Event',
    date: 'NOV 7, 2024',
    title: 'Concepts to Clarity: WAF 2024 Day Two Roundup',
    excerpt: 'Kanto documents the live jury critique sessions at WAF 2024 where Obra Majoralia presented the Loboc Performing Arts Theater to an international panel — one of four Filipino firms in the Future Projects category.',
    imageUrl: 'https://kanto.ph/wp-content/uploads/2024/11/20241106_140415-scaled.jpg',
    url: 'https://kanto.ph/voices/events/concepts-to-clarity-waf-2024-day-two-roundup/',
  },
  {
    id: 'inside-obra-majoralia',
    category: 'Recognition',
    date: 'DEC 7, 2023',
    title: 'Exploring Architectural Excellence: A Glimpse Inside Obra Majoralia',
    excerpt: 'Lantawan Magazine spotlights the studio following a University of San Carlos student visit, covering the "Design, Context, Intuition" philosophy and the use of scaffolding imagery as a metaphor for evolving cultural identity.',
    imageUrl: 'https://lantawanmag.wordpress.com/wp-content/uploads/2023/12/dscf6992.jpg?w=1024',
    url: 'https://lantawanmag.wordpress.com/2023/12/07/exploring-architectural-excellence-a-glimpse-inside-obra-majoralia/',
  },
  {
    id: 'grohe-young-visionaries',
    category: 'Awards',
    date: 'MAY 7, 2024',
    title: 'Kanto × GROHE Young Visionaries Challenge — Overall Winner',
    excerpt: 'Obra Majoralia takes the overall win at the Kanto × GROHE Young Visionaries Challenge, recognized for a design that explores water, material, and spatial experience in a tropical context.',
    imageUrl: '/images/award-3.webp',
    url: 'https://www.instagram.com/p/C6qllCNtZhe/',
  },
  {
    id: 'manila-architecture-festival-2025',
    category: 'Talk',
    date: 'FEB 4, 2025',
    title: 'Manila Architecture Festival 2025',
    excerpt: 'Ar. Jonathan Cruz joins the Manila Architecture Festival 2025 as a speaker, sharing the studio\'s approach to context-driven design and its experience on the international stage.',
    imageUrl: '/images/jonathan-cruz.webp',
    url: 'https://www.instagram.com/p/DGcaW4rPAQl/?img_index=3',
  },
];
