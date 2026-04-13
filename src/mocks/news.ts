export type NewsCategory = 'Recognition' | 'Event' | 'Awards' | 'Talk';

export interface NewsItem {
  id: string;
  category: NewsCategory;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'house-of-song-loboc',
    category: 'Recognition',
    date: 'NOV 3, 2024',
    title: 'House of Song: Loboc Performing Arts Center by Obra Majoralia Design Studio',
    excerpt: 'Our proposal for the Loboc Performing Arts Center was recognized for its integration of cultural heritage and contemporary architectural language.',
    imageUrl: '/images/news1.jpg',
  },
  {
    id: 'waf-2024-day-two',
    category: 'Recognition',
    date: 'NOV 7, 2024',
    title: 'Concepts to Clarity: WAF 2024 Day Two Roundup',
    excerpt: 'A recap of our participation at the World Architecture Festival 2024, where we presented our approach to contextual design in the tropics.',
    imageUrl: '/images/news2.jpg',
  },
  {
    id: 'inside-obra-majoralia',
    category: 'Recognition',
    date: 'DEC 7, 2023',
    title: 'Exploring Architectural Excellence: A Glimpse Inside Obra Majoralia',
    excerpt: 'A feature on the studio\'s design philosophy, process, and the people behind the work — from concept to construction.',
    imageUrl: '/images/news3.jpg',
  },
  {
    id: 'waf-2024-new-talent',
    category: 'Recognition',
    date: 'OCT 19, 2024',
    title: 'World Architecture Festival 2024: Celebrating New Talent and Global Excellence',
    excerpt: 'Obra Majoralia was among the studios celebrated at WAF 2024 for emerging talent in tropical residential architecture.',
    imageUrl: '/images/news4.jpg',
  },
  {
    id: 'grohe-young-visionaries',
    category: 'Awards',
    date: 'MAY 7, 2024',
    title: 'GROHE Young Visionaries Challenge',
    excerpt: 'Our entry to the GROHE Young Visionaries Challenge explored the intersection of water, material, and spatial experience in a tropical context.',
    imageUrl: '/images/news5.jpg',
  },
  {
    id: 'manila-architecture-festival-2025',
    category: 'Talk',
    date: 'FEB 4, 2025',
    title: 'Manila Architecture Festival 2025 Speaker',
    excerpt: 'Ar. Jonathan Cruz was invited to speak at the Manila Architecture Festival 2025, sharing insights on future-driven design in the Philippine context.',
    imageUrl: '/images/news6.jpg',
  },
  {
    id: 'arcasia-forum-2024',
    category: 'Event',
    date: 'SEP 12, 2024',
    title: 'ARCASIA Forum 2024: Architecture Across Asia',
    excerpt: 'The studio participated in the ARCASIA Forum, engaging with architects across Southeast Asia on the future of regional architecture.',
    imageUrl: '/images/news7.jpg',
  },
  {
    id: 'aia-philippines-awards',
    category: 'Awards',
    date: 'JUN 20, 2024',
    title: 'AIA Philippines Design Awards 2024 — Shortlisted',
    excerpt: 'Two projects by Obra Majoralia were shortlisted for the AIA Philippines Design Awards, recognizing excellence in residential and cultural architecture.',
    imageUrl: '/images/news8.jpg',
  },
];
