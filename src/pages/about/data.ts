// Shared About content — used by the About page and the layout drafts.

// Real team members — fill in as photos arrive.
// photo: a portrait in /public/images/team/, e.g. '/images/team/firstname.webp'
export const TEAM: { name: string; role: string; photo: string }[] = [];

// Shown until TEAM has people in it — one row on desktop, 2 × 2 on phones
export const TEAM_PLACEHOLDER = Array.from({ length: 4 }, () => ({
  name: 'Team Member',
  role: 'Architectural Designer',
  photo: '',
}));

export const MANIFESTO = [
  {
    label: 'DESIGN',
    formula: 'intention + function + experience',
    body: 'Design adds value not by being loud, but by being right — with style as a natural result, not the goal.',
  },
  {
    label: 'CONTEXT',
    formula: 'site + climate + resources + capability',
    body: 'Context balances ambition and reality, making sure design works not just on paper, but on site.',
  },
  {
    label: 'INTUITION',
    formula: 'experience + pattern recognition + empathy',
    body: 'The ability to sense the right space before it is drawn — by understanding how people live, how environments behave, and how constraints shape form.',
  },
];

export const CREDENTIALS = {
  education: [
    { title: 'University of San Carlos', sub: 'Bachelor of Science in Architecture', year: '2018' },
    { title: 'University of Pécs, Hungary', sub: 'International Exchange Student', year: '2016–17' },
  ],
  work: [
    { title: 'TopLab Architecture Review Center', sub: 'Mentor', year: '2023–2025' },
    { title: 'BYC Archventure', sub: 'Architect', year: '2021–2022' },
    { title: 'WTA Architecture + Design Studio', sub: 'Architect', year: '2019–2020' },
  ],
  awards: [
    { title: 'WAF 2021 — WAFX Overall Winner', sub: 'Team Member | WTA Architecture + Design Studio', year: '2020' },
    { title: 'WAF 2024 Singapore', sub: 'Shortlisted — House of Song, Loboc Performing Arts', year: '2024' },
    { title: 'Young Visionaries Challenge', sub: 'Kanto X Grohe — Overall Winner', year: '2024' },
  ],
};

export const STATEMENT = {
  label: 'Studio · Est. 2018',
  paragraphs: [
    'Rooted in a deep understanding of context — the culture, history, and aspirations of the people and places they design for.',
    'Guided by intuition and a sensitivity to both form and function, they create spaces that are purposeful, poetic, and responsive.',
  ],
};

export const FOUNDER = {
  name: 'Ar. Jonathan Cruz',
  role: 'Principal Architect & Founder',
  photo: '/images/jonathan-cruz.webp',
  quote: 'Architecture must listen before it speaks.',
  bio: [
    'A licensed architect with a practice rooted in cultural sensitivity, spatial precision, and award-winning design.',
    'Trained at the University of San Carlos and internationally at the University of Pécs, Hungary, Ar. Jonathan Cruz brings a global perspective to deeply local contexts. His work spans residential, hospitality, interior, and monumental typologies.',
  ],
};

export const PROPOSAL_PDF = '/casa-rossi-proposal.pdf';
