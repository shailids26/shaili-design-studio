import fs from 'node:fs';
import path from 'node:path';

export type Category = 'Architecture' | 'Interiors';
export interface GalleryImage { src: string; alt: string; caption: string; wide?: boolean }
export interface Project {
  slug: string; title: string; category: Category;
  demo: boolean;                       // true = illustrative sample, NOT a real commission
  status: 'Completed' | 'Concept' | 'Render';
  location?: string; area?: string; year?: string;
  featured?: boolean; featuredOrder?: number;
  cover: string; coverAlt: string;
  gallery: GalleryImage[];
  overview: string; brief: string; response: string;
  materials: string[]; features: string[];
  beforeAfter?: { before: string; after: string; beforeAlt: string; afterAlt: string };
}

// ANNOTATED SAMPLE – copy this shape to add a project (see README).
const mk = (
  slug: string, title: string, category: Category, status: Project['status'],
  featured: number, overview: string, brief: string, response: string,
  materials: string[], features: string[],
): Project => ({
  slug, title, category, demo: true, status,
  featured: featured > 0, featuredOrder: featured || undefined,
  cover: `/images/demo/${slug}-cover.svg`, coverAlt: `Illustrative placeholder for ${title}`,
  gallery: [
    { src: `/images/demo/${slug}-1.svg`, alt: `${title}: wide placeholder view`, caption: 'Wide view (placeholder)', wide: true },
    { src: `/images/demo/${slug}-2.svg`, alt: `${title}: detail placeholder`, caption: 'Detail one (placeholder)' },
    { src: `/images/demo/${slug}-3.svg`, alt: `${title}: second detail placeholder`, caption: 'Detail two (placeholder)' },
  ],
  overview, brief, response, materials, features,
});

export const projects: Project[] = [
  mk('courtyard-house', 'Courtyard House', 'Architecture', 'Concept', 1,
    'A home organised around a shaded central court that brings light and air into every room.',
    'A family home that feels private from the street yet open within.',
    'Rooms wrap a courtyard, with deep verandahs and carefully placed openings for cross-ventilation.',
    ['Exposed concrete', 'Lime plaster', 'Timber screens'], ['Central courtyard', 'Deep verandahs', 'Cross-ventilation']),
  mk('hillside-retreat', 'Hillside Retreat', 'Architecture', 'Render', 2,
    'A stepped weekend retreat that follows the slope and frames the valley.',
    'A calm getaway that sits lightly on a sloping site.',
    'Terraced volumes follow the contours, with long windows aimed at the view.',
    ['Local stone', 'Charred timber', 'Black steel'], ['Stepped plan', 'Framed views', 'Green roof']),
  mk('linen-brass-apartment', 'Linen & Brass Apartment', 'Interiors', 'Concept', 3,
    'A compact apartment interior built on soft textures and warm metal.',
    'Make a small home feel generous and quietly luxurious.',
    'Continuous joinery, a restrained palette and brass accents unify open living spaces.',
    ['Linen upholstery', 'Brushed brass', 'Oak veneer'], ['Built-in joinery', 'Layered lighting', 'Flexible dining']),
  mk('atelier-loft', 'Atelier Loft', 'Interiors', 'Render', 4,
    'A double-height loft that balances a working studio with a place to live.',
    'Combine creative work and daily life in one open volume.',
    'A mezzanine, steel-framed partitions and deep navy surfaces define zones without walls.',
    ['Blackened steel', 'Polished plaster', 'Walnut'], ['Mezzanine study', 'Glazed partitions', 'Gallery wall']),
  mk('terrace-pavilion', 'Terrace Pavilion', 'Architecture', 'Concept', 0,
    'A light garden pavilion for gathering, reading and dining outdoors.',
    'A year-round outdoor room attached to an existing house.',
    'A slim roof plane on slender columns creates shade with open edges.',
    ['Timber', 'Slate', 'Glass'], ['Deep overhang', 'Operable screens']),
  mk('quiet-study', 'Quiet Study', 'Interiors', 'Concept', 0,
    'A focused home study with acoustic softness and warm light.',
    'A calm room for reading and remote work.',
    'Wrapped shelving, felt panels and a single sculptural pendant set the mood.',
    ['Felt', 'Ash', 'Bronze'], ['Acoustic panelling', 'Concealed storage']),
  mk('stone-gate-villa', 'Stone Gate Villa', 'Architecture', 'Render', 0,
    'A villa entered through a monolithic stone gate leading to a hidden garden.',
    'A secluded residence with a strong sense of arrival.',
    'Solid street-side walls give way to glazed garden elevations.',
    ['Sandstone', 'Brass', 'Glass'], ['Gate court', 'Garden-facing living']),
  mk('gallery-dining-room', 'Gallery Dining Room', 'Interiors', 'Concept', 0,
    'A dining room designed as a backdrop for art and long evenings.',
    'A formal yet relaxed room for entertaining.',
    'Deep walls, picture lighting and a monolithic table anchor the room.',
    ['Lime wash', 'Stone', 'Smoked oak'], ['Picture lighting', 'Monolithic table']),
];

// Build-time validation
const seen = new Set<string>();
for (const p of projects) {
  if (seen.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
  seen.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Bad slug: ${p.slug}`);
  if (!['Architecture', 'Interiors'].includes(p.category)) throw new Error(`Bad category: ${p.slug}`);
  for (const f of [p.cover, ...p.gallery.map((g) => g.src), p.beforeAfter?.before, p.beforeAfter?.after].filter(Boolean) as string[])
    if (!fs.existsSync(path.join('public', f))) throw new Error(`Missing image for ${p.slug}: ${f}`);
}
export const featured = projects.filter((p) => p.featured).sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)).slice(0, 4);
export const related = (p: Project) =>
  [...projects.filter((o) => o.slug !== p.slug && o.category === p.category), ...projects.filter((o) => o.slug !== p.slug && o.category !== p.category)].slice(0, 3);
