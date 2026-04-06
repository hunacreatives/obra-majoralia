export interface Project {
  id: string;
  title: string;
  location: string;
  typology: 'Residential' | 'Interior' | 'Hospitality' | 'Monumental' | 'Cultural' | 'Commercial';
  year: number;
  concept: string;
  conceptExtended?: string;
  area?: string;
  status?: string;
  imageUrl: string;
  imageAspect: '4/3' | '3/4' | '21/9' | '1/1';
  featured?: boolean;
  galleryImages?: string[];
  annotations?: { label: string; sublabel?: string; x: string; y: string }[];
}

export const projects: Project[] = [
  {
    id: 's-residence',
    title: 'S Residence',
    location: 'Dipolog City, ZAN',
    typology: 'Residential',
    year: 2024,
    area: '420 SQM.',
    status: 'Completed',
    concept: 'Grounded in the clarity of minimalism and the warmth of tropical living, the design blends wood, stone, and concrete to create a space that feels calm, honest, and enduring.',
    conceptExtended: 'Natural textures define the palette: the warmth of wood, the solidity of stone, and the raw elegance of concrete come together in quiet balance. Wide openings dissolve the line between inside and out, while clean forms and open layouts support a sense of ease and quiet luxury.',
    imageUrl: 'https://obramajoralia.my.canva.site/copy-of-02-obra-majoralia-web-design/_assets/media/ac8de25f47b57d0632f8afc1699fe1d9.jpg',
    imageAspect: '4/3',
    featured: true,
    galleryImages: [],
  },
  {
    id: 'pk-house',
    title: 'PK House',
    location: 'Dipolog City, ZAN',
    typology: 'Residential',
    year: 2024,
    area: '420 SQM.',
    status: 'Completed',
    concept: 'A private residence designed around the passage of wind and light. Concrete walls frame views of the surrounding tropical landscape, while deep overhangs regulate the equatorial sun. The structure negotiates between enclosure and openness.',
    conceptExtended: 'Natural textures define the interior palette, while the warmth of timber softens the concrete structure. Large openings frame views of the surrounding landscape, blurring the boundary between interior and exterior spaces.',
    imageUrl: 'https://storage.readdy-site.link/project_files/057d11fe-555c-401e-b7e9-638ff88babf4/4aa093d8-6945-43c3-b055-6c92468aed13_Obra-Majoralia---PK-House.png?v=a6f3cac22ace01cdef70c2b52bdbe632',
    imageAspect: '4/3',
    featured: true,
    galleryImages: [
      'https://readdy.ai/api/search-image?query=modern%20tropical%20residential%20exterior%20concrete%20and%20timber%20facade%20deep%20overhangs%20lush%20garden%20Philippines%20architectural%20photography%20warm%20afternoon%20light%20clean%20lines%20minimal%20refined%20neutral%20palette&width=1200&height=675&seq=pk-g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=residential%20interior%20living%20room%20concrete%20walls%20timber%20ceiling%20warm%20light%20open%20plan%20tropical%20Philippines%20architectural%20photography%20minimal%20furniture%20calm%20neutral%20tones%20editorial&width=1200&height=675&seq=pk-g2&orientation=landscape',
    ],
  },
  {
    id: 'busay-retreat',
    title: 'Busay Mountain Retreat',
    location: 'Busay, Cebu, Philippines',
    typology: 'Hospitality',
    year: 2023,
    area: '680 SQM.',
    status: 'Completed',
    concept: 'Set at 700 meters above sea level, this retreat distills the essence of highland living. Timbered volumes rest lightly on the ridge, and framed apertures direct attention toward the valley and distant sea.',
    conceptExtended: 'The program is distributed across three pavilions connected by covered walkways. Each pavilion frames a distinct view — the valley, the forest canopy, and the open sky. Materials are sourced locally: rough-hewn timber, river stone, and rammed earth.',
    imageUrl: 'https://readdy.ai/api/search-image?query=luxury%20mountain%20retreat%20architecture%20timber%20and%20concrete%20nestled%20in%20tropical%20forest%20elevated%20deck%20overlooking%20valley%20Philippines%20editorial%20architectural%20photography%20warm%20natural%20materials%20glass%20openings%20organic%20forms%20misty%20morning%20light%20neutral%20tones&width=675&height=900&seq=2&orientation=portrait',
    imageAspect: '3/4',
    featured: true,
    galleryImages: [
      'https://readdy.ai/api/search-image?query=mountain%20retreat%20hospitality%20architecture%20timber%20pavilion%20elevated%20deck%20forest%20canopy%20view%20Philippines%20misty%20morning%20light%20warm%20natural%20materials%20editorial%20photography%20neutral%20tones&width=1200&height=800&seq=busay-g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=highland%20retreat%20interior%20warm%20timber%20walls%20stone%20floor%20open%20fireplace%20mountain%20view%20Philippines%20architectural%20photography%20cozy%20refined%20minimal%20editorial&width=800&height=1000&seq=busay-g2&orientation=portrait',
      'https://readdy.ai/api/search-image?query=resort%20pool%20deck%20mountain%20view%20tropical%20forest%20Philippines%20dusk%20light%20warm%20tones%20infinity%20edge%20water%20reflection%20editorial%20architectural%20photography&width=1200&height=675&seq=busay-g3&orientation=landscape',
    ],
  },
  {
    id: 'mactan-coastal-pavilion',
    title: 'Mactan Coastal Pavilion',
    location: 'Lapu-Lapu City, Philippines',
    typology: 'Residential',
    year: 2024,
    area: '560 SQM.',
    status: 'Completed',
    concept: 'A series of interlocking pavilions arranged around a courtyard that opens toward the sea. The project explores the threshold between habitation and landscape — each room a distinct encounter with water, wind, and horizon.',
    conceptExtended: 'The courtyard acts as a mediating space — neither fully interior nor exterior. Sliding panels of timber and glass allow the rooms to dissolve into the landscape. The pool extends the horizon line, merging with the sea beyond.',
    imageUrl: 'https://readdy.ai/api/search-image?query=dramatic%20coastal%20architecture%20panoramic%20view%20luxury%20pavilions%20overlooking%20ocean%20concrete%20and%20timber%20cantilevered%20volumes%20sea%20views%20Philippines%20sunset%20light%20editorial%20minimal%20architectural%20photography%20infinity%20pool%20calm%20waters%20reflection%20neutral%20palette&width=1260&height=540&seq=3&orientation=landscape',
    imageAspect: '21/9',
    featured: true,
    galleryImages: [
      'https://readdy.ai/api/search-image?query=coastal%20residence%20courtyard%20concrete%20timber%20pavilions%20sea%20view%20Philippines%20afternoon%20light%20editorial%20architectural%20photography%20calm%20water%20reflection%20minimal%20refined%20neutral&width=1200&height=675&seq=mactan-g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=coastal%20house%20interior%20open%20plan%20living%20sea%20view%20sliding%20glass%20doors%20timber%20ceiling%20Philippines%20architectural%20photography%20warm%20light%20minimal%20furniture%20editorial&width=1200&height=675&seq=mactan-g2&orientation=landscape',
    ],
  },
  {
    id: 'q-residence-interiors',
    title: 'Q Residence Interiors',
    location: 'Dipolog City, ZAN',
    typology: 'Interior',
    year: 2024,
    area: '252.88 SQM.',
    status: 'Construction Phase',
    concept: 'A residential interior conceived around the tension between warmth and restraint. Marble, timber, and brushed metal are composed with precision — each surface chosen for its tactile quality and its relationship to light.',
    conceptExtended: 'The living spaces flow continuously, separated by changes in material and ceiling height rather than walls. Custom joinery integrates storage, display, and structure into a single coherent system. Lighting is layered — ambient, task, and accent — to allow the space to shift in mood from morning to evening.',
    imageUrl: 'https://readdy.ai/api/search-image?query=luxury%20residential%20interior%20design%20marble%20walls%20warm%20timber%20accents%20brushed%20metal%20details%20elegant%20living%20room%20Philippines%20architectural%20photography%20soft%20diffused%20light%20refined%20minimal%20editorial%20neutral%20warm%20palette&width=1260&height=540&seq=qres-hero&orientation=landscape',
    imageAspect: '21/9',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=luxury%20interior%20dining%20room%20marble%20feature%20wall%20custom%20timber%20joinery%20warm%20pendant%20lighting%20Philippines%20architectural%20photography%20editorial%20refined%20minimal%20neutral%20warm%20tones&width=800&height=1000&seq=qres-g1&orientation=portrait',
      'https://readdy.ai/api/search-image?query=luxury%20interior%20master%20bedroom%20marble%20headboard%20wall%20warm%20timber%20ceiling%20soft%20ambient%20lighting%20Philippines%20architectural%20photography%20editorial%20minimal%20calm%20neutral%20palette&width=800&height=1000&seq=qres-g2&orientation=portrait',
      'https://readdy.ai/api/search-image?query=luxury%20interior%20bathroom%20marble%20walls%20freestanding%20tub%20warm%20light%20natural%20stone%20floor%20Philippines%20architectural%20photography%20editorial%20minimal%20refined%20calm&width=800&height=1000&seq=qres-g3&orientation=portrait',
    ],
  },
  {
    id: 'lahug-cultural-hub',
    title: 'Lahug Cultural Hub',
    location: 'Cebu City, Philippines',
    typology: 'Cultural',
    year: 2022,
    area: '1,200 SQM.',
    status: 'Completed',
    concept: 'A civic building conceived as a porous threshold. Textured concrete brise-soleil filters the tropical sun while permitting visual connection between interior and city. The ground floor dissolves into a covered public plaza.',
    conceptExtended: 'The building section is organized around a central atrium that draws light deep into the plan. Exhibition spaces are arranged on the upper floors, while the ground level is given over entirely to public use — a shaded gathering space open to the street.',
    imageUrl: 'https://readdy.ai/api/search-image?query=contemporary%20cultural%20center%20architecture%20textured%20concrete%20walls%20clerestory%20windows%20dramatic%20light%20shafts%20gallery%20space%20minimal%20furnishing%20Philippines%20warm%20afternoon%20light%20geometric%20facade%20brise-soleil%20shadows%20brutalist%20civic%20architecture%20monochromatic&width=600&height=600&seq=4&orientation=squarish',
    imageAspect: '1/1',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=cultural%20center%20interior%20gallery%20space%20concrete%20walls%20dramatic%20light%20shafts%20minimal%20exhibition%20Philippines%20architectural%20photography%20editorial%20neutral%20tones&width=1200&height=675&seq=lahug-g1&orientation=landscape',
    ],
  },
  {
    id: 'talamban-residence',
    title: 'Talamban Residence',
    location: 'Cebu City, Philippines',
    typology: 'Residential',
    year: 2023,
    area: '310 SQM.',
    status: 'Completed',
    concept: 'A disciplined house on a narrow urban plot. The section stratifies private from communal, and the facade — a composition of timber and concrete — mediates between the domestic interior and the street.',
    conceptExtended: 'The ground floor is given over to communal living — kitchen, dining, and a garden court. The upper floors contain the private rooms, each oriented to capture morning light. The facade is a screen of vertical timber fins that provides privacy without enclosure.',
    imageUrl: 'https://readdy.ai/api/search-image?query=narrow%20urban%20residence%20architecture%20timber%20and%20concrete%20facade%20vertical%20proportions%20tropical%20courtyard%20Philippines%20architectural%20photography%20clean%20lines%20warm%20wood%20texture%20geometric%20window%20openings%20lush%20plants%20contemporary%20minimal%20design%20editorial&width=675&height=900&seq=5&orientation=portrait',
    imageAspect: '3/4',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=urban%20residence%20interior%20courtyard%20garden%20concrete%20timber%20warm%20light%20Philippines%20architectural%20photography%20editorial%20minimal%20calm%20neutral%20tones&width=1200&height=675&seq=talamban-g1&orientation=landscape',
    ],
  },
  {
    id: 'e-mausoleum',
    title: 'E Mausoleum',
    location: 'Municipality of Katipunan, ZAN',
    typology: 'Monumental',
    year: 2024,
    area: '98.76 SQM.',
    status: 'Construction Phase',
    concept: 'A memorial structure conceived as a place of quiet permanence. The form — a compressed pyramid of dark shingles — rises from a landscaped ground plane, its geometry both ancient and precise.',
    conceptExtended: 'The interior is a single contemplative chamber, lit from above by a narrow oculus. The surrounding landscape is organized as a series of concentric rings — a garden of remembrance that frames the approach and departure. A future expansion is planned to the east, extending the memorial garden.',
    imageUrl: 'https://readdy.ai/api/search-image?query=monumental%20mausoleum%20architecture%20dark%20shingle%20pyramid%20roof%20tropical%20garden%20Philippines%20architectural%20photography%20editorial%20dramatic%20sky%20contemplative%20minimal%20refined%20neutral%20tones&width=1260&height=540&seq=emaus-hero&orientation=landscape',
    imageAspect: '21/9',
    annotations: [
      { label: 'Main', sublabel: 'Building', x: '28%', y: '52%' },
      { label: 'Future', sublabel: 'Expansion', x: '72%', y: '68%' },
    ],
    galleryImages: [
      'https://readdy.ai/api/search-image?query=mausoleum%20memorial%20architecture%20aerial%20view%20pyramid%20roof%20tropical%20garden%20landscaped%20grounds%20Philippines%20editorial%20architectural%20photography%20dramatic%20neutral%20tones&width=1200&height=800&seq=emaus-g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=memorial%20interior%20contemplative%20chamber%20single%20oculus%20light%20shaft%20stone%20floor%20minimal%20Philippines%20architectural%20photography%20editorial%20calm%20quiet%20neutral&width=800&height=1000&seq=emaus-g2&orientation=portrait',
    ],
  },
  {
    id: 'itpark-office-pavilion',
    title: 'IT Park Office Pavilion',
    location: 'Cebu City, Philippines',
    typology: 'Commercial',
    year: 2024,
    area: '3,400 SQM.',
    status: 'Completed',
    concept: 'A mid-rise office building that refuses the generic typology. Deep concrete fins modulate the facade and eliminate glare, while a triple-height atrium connects all floors through a shared urban living room.',
    conceptExtended: 'The atrium is the social heart of the building — a space for informal gathering, collaboration, and rest. Planting cascades from the upper floors, softening the concrete structure. The ground floor opens to the street, activating the public realm.',
    imageUrl: 'https://readdy.ai/api/search-image?query=modern%20commercial%20office%20building%20architecture%20concrete%20fins%20perforated%20screen%20facade%20detail%20geometric%20pattern%20natural%20light%20and%20shadow%20minimal%20corporate%20architecture%20Philippines%20editorial%20photography%20cool%20neutral%20tones%20precision%20structural%20detail&width=900&height=675&seq=6&orientation=landscape',
    imageAspect: '4/3',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=office%20building%20atrium%20interior%20triple%20height%20space%20planting%20concrete%20structure%20warm%20light%20Philippines%20architectural%20photography%20editorial%20minimal%20refined%20neutral&width=1200&height=675&seq=itpark-g1&orientation=landscape',
    ],
  },
  {
    id: 'liloan-beach-club',
    title: 'Liloan Beach Club',
    location: 'Liloan, Cebu, Philippines',
    typology: 'Hospitality',
    year: 2023,
    area: '820 SQM.',
    status: 'Completed',
    concept: 'A low-lying social structure that hugs the waterfront. The roof — a continuous folded plane — provides shelter without enclosure. Below it, activities unfold in the space between land and sea.',
    conceptExtended: 'The program is deliberately loose — bar, dining, pool deck, and beach access are woven together without hard boundaries. The folded roof is the unifying element, its underside lined with timber that glows warm against the sea light. At night, the structure becomes a lantern on the water.',
    imageUrl: 'https://readdy.ai/api/search-image?query=waterfront%20beach%20club%20architecture%20low%20horizontal%20pavilion%20folded%20roof%20ocean%20backdrop%20Philippines%20dusk%20light%20warm%20tones%20open%20air%20structure%20natural%20materials%20timber%20concrete%20calm%20sea%20reflections%20editorial%20architectural%20photography%20minimal%20refined&width=600&height=600&seq=8&orientation=squarish',
    imageAspect: '1/1',
    galleryImages: [
      'https://readdy.ai/api/search-image?query=beach%20club%20pool%20deck%20ocean%20view%20timber%20roof%20structure%20Philippines%20dusk%20warm%20light%20editorial%20architectural%20photography%20minimal%20refined%20calm%20sea&width=1200&height=800&seq=liloan-g1&orientation=landscape',
      'https://readdy.ai/api/search-image?query=beach%20club%20bar%20interior%20open%20air%20timber%20ceiling%20warm%20light%20sea%20view%20Philippines%20architectural%20photography%20editorial%20minimal%20refined%20neutral%20warm%20tones&width=800&height=1000&seq=liloan-g2&orientation=portrait',
      'https://readdy.ai/api/search-image?query=beach%20club%20night%20view%20lantern%20light%20reflection%20water%20Philippines%20architectural%20photography%20editorial%20warm%20glow%20minimal%20refined&width=1200&height=675&seq=liloan-g3&orientation=landscape',
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);