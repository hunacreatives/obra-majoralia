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
    imageUrl: 'https://readdy.ai/api/search-image?query=performing%20arts%20center%20architecture%20tropical%20Philippines%20concrete%20timber%20dramatic%20canopy%20editorial%20architectural%20photography%20warm%20afternoon%20light%20minimal%20refined%20neutral%20tones&width=320&height=240&seq=news1&orientation=landscape',
  },
  {
    id: 'waf-2024-day-two',
    category: 'Recognition',
    date: 'NOV 7, 2024',
    title: 'Concepts to Clarity: WAF 2024 Day Two Roundup',
    excerpt: 'A recap of our participation at the World Architecture Festival 2024, where we presented our approach to contextual design in the tropics.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20festival%20conference%20presentation%20audience%20panel%20discussion%20editorial%20photography%20professional%20event%20neutral%20tones&width=320&height=240&seq=news2&orientation=landscape',
  },
  {
    id: 'inside-obra-majoralia',
    category: 'Recognition',
    date: 'DEC 7, 2023',
    title: 'Exploring Architectural Excellence: A Glimpse Inside Obra Majoralia',
    excerpt: 'A feature on the studio\'s design philosophy, process, and the people behind the work — from concept to construction.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20studio%20interior%20workspace%20design%20team%20working%20models%20drawings%20editorial%20photography%20warm%20light%20minimal%20refined%20neutral&width=320&height=240&seq=news3&orientation=landscape',
  },
  {
    id: 'waf-2024-new-talent',
    category: 'Recognition',
    date: 'OCT 19, 2024',
    title: 'World Architecture Festival 2024: Celebrating New Talent and Global Excellence',
    excerpt: 'Obra Majoralia was among the studios celebrated at WAF 2024 for emerging talent in tropical residential architecture.',
    imageUrl: 'https://readdy.ai/api/search-image?query=world%20architecture%20festival%20award%20ceremony%20group%20photo%20architects%20professional%20event%20editorial%20photography%20neutral%20tones&width=320&height=240&seq=news4&orientation=landscape',
  },
  {
    id: 'grohe-young-visionaries',
    category: 'Awards',
    date: 'MAY 7, 2024',
    title: 'GROHE Young Visionaries Challenge',
    excerpt: 'Our entry to the GROHE Young Visionaries Challenge explored the intersection of water, material, and spatial experience in a tropical context.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20competition%20award%20young%20designers%20grohe%20challenge%20editorial%20photography%20minimal%20neutral%20tones%20professional&width=320&height=240&seq=news5&orientation=landscape',
  },
  {
    id: 'manila-architecture-festival-2025',
    category: 'Talk',
    date: 'FEB 4, 2025',
    title: 'Manila Architecture Festival 2025 Speaker',
    excerpt: 'Ar. Jonathan Cruz was invited to speak at the Manila Architecture Festival 2025, sharing insights on future-driven design in the Philippine context.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20speaker%20conference%20stage%20presentation%20professional%20architect%20Philippines%20editorial%20photography%20warm%20light%20neutral%20tones&width=320&height=240&seq=news6&orientation=landscape',
  },
  {
    id: 'arcasia-forum-2024',
    category: 'Event',
    date: 'SEP 12, 2024',
    title: 'ARCASIA Forum 2024: Architecture Across Asia',
    excerpt: 'The studio participated in the ARCASIA Forum, engaging with architects across Southeast Asia on the future of regional architecture.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20forum%20asia%20conference%20event%20professional%20architects%20panel%20discussion%20editorial%20photography%20neutral%20tones&width=320&height=240&seq=news7&orientation=landscape',
  },
  {
    id: 'aia-philippines-awards',
    category: 'Awards',
    date: 'JUN 20, 2024',
    title: 'AIA Philippines Design Awards 2024 — Shortlisted',
    excerpt: 'Two projects by Obra Majoralia were shortlisted for the AIA Philippines Design Awards, recognizing excellence in residential and cultural architecture.',
    imageUrl: 'https://readdy.ai/api/search-image?query=architecture%20awards%20ceremony%20Philippines%20professional%20event%20editorial%20photography%20warm%20light%20neutral%20tones%20recognition&width=320&height=240&seq=news8&orientation=landscape',
  },
];
