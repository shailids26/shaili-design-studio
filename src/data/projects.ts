import fs from 'node:fs';
import path from 'node:path';

export type Category = 'Architecture' | 'Interior';
export interface GalleryImage { src: string; alt: string; caption?: string }
export interface Project {
  slug: string; title: string; category: Category;
  demo: boolean;                       // true = illustrative sample, NOT a real commission
  projectType: string;                 // e.g. 'Residential Architecture'
  style?: string;                      // e.g. 'Modern Contemporary'
  location?: string; area?: string; year?: string;   // optional, shown only if filled
  featured?: boolean; featuredOrder?: number;        // 1-4 = shown on the home page
  cover: string; coverAlt: string;
  gallery: GalleryImage[];             // any number of images; layout adapts automatically
  description: string;                 // one short paragraph
  keyFeatures: string[];
  beforeAfter?: { before: string; after: string; beforeAlt: string; afterAlt: string };
}

// To add a project: copy one entry below and change the values.
// PHOTOS: drop any number of images into public/images/<slug>/ named 1.jpg, 2.jpg, 3.jpg ...
// 1.jpg is the cover; the rest appear in the gallery automatically (no need to list them here).
const photosFor = (slug: string, title: string, coverAlt: string): GalleryImage[] => {
  const dir = path.join('public', 'images', slug);
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort((x, y) => x.localeCompare(y, undefined, { numeric: true }))
    : [];
  if (!files.length) throw new Error(`No photos found in public/images/${slug}/`);
  return files.map((f, i) => ({ src: `/images/${slug}/${f}`, alt: i === 0 ? coverAlt : `${title}: view ${i + 1}` }));
};
// category: 'Architecture' or 'Interior'. order 1-4 = featured on the home page (0 = not featured).
const real = (
  slug: string, title: string, order: number, projectType: string, style: string,
  description: string, keyFeatures: string[], alt: string, category: Category = 'Architecture',
): Project => {
  const gallery = photosFor(slug, title, alt);
  return {
    slug, title, category, demo: false, projectType, style,
    featured: order > 0, featuredOrder: order || undefined,
    cover: gallery[0].src, coverAlt: alt, gallery, description, keyFeatures,
  };
};

export const projects: Project[] = [
  real('arch-facade-building', 'Arch Façade Building', 1, 'Mixed-Use Architecture', 'Contemporary with Indo-modern influences',
    'A distinctive mixed-use development that combines a street-facing retail space with contemporary upper-level residences. The façade is defined by an elegant arched feature, vertical wooden fins, patterned jaali screens, and expansive glazed openings. A refined palette of warm neutrals and earthy accents creates a strong architectural identity while balancing commercial visibility with residential privacy.',
    ['Sculptural arched frame', 'Vertical timber accents', 'Decorative jaali', 'Glazed balconies', 'Integrated greenery', 'Ground-floor commercial frontage'],
    'Render of a narrow mixed-use building with an arched timber-fin feature and ground-floor retail'),
  real('stone-frame-house', 'Stone Frame House', 2, 'Residential Architecture', 'Modern Contemporary',
    'A modern residence defined by bold geometric frames, elegant stone textures, and warm wood accents. Expansive glazing, landscaped balconies, and thoughtfully integrated lighting create a sophisticated façade that balances contemporary aesthetics with warmth and functionality.',
    ['Geometric façade', 'Stone cladding', 'Wood-finish soffits', 'Glass railings', 'Vertical fins', 'Landscaped balconies'],
    'Render of a contemporary residence with stone-clad frames, wooden soffits and planted balconies'),
  real('terracotta-jaali-house', 'Terracotta Jaali House', 0, 'Residential Architecture', 'Contemporary Indo-Modern',
    'A refined residential façade that blends contemporary geometry with traditional Indian design influences. The interplay of warm brick textures, terracotta jaali screens, crisp white frames, and wood-finish ceilings creates a distinctive architectural character. Spacious balconies, transparent railings, and integrated greenery soften the bold composition, bringing warmth, privacy, and elegance to everyday living.',
    ['Terracotta jaali', 'Textured brick cladding', 'Bold geometric frames', 'Glass balcony railings', 'Wood-finish soffits', 'Landscaped frontage'],
    'Render of a two-storey residence with terracotta jaali screen, brick-clad frame and glass balconies'),
  real('fin-pergola-residence', 'Fin & Pergola Residence', 0, 'Residential Architecture', 'Contemporary Luxury',
    'A striking multi-storey residence that brings together bold architectural volumes, refined stone textures, and warm wood accents. Vertical fins, expansive glass balconies, and a pergola-covered terrace create a dynamic façade, while integrated linear lighting and landscaped edges enhance its sophisticated, understated character.',
    ['Textured stone cladding', 'Vertical fins', 'Glass balcony railings', 'Wood-finish soffits', 'Pergola terrace', 'Integrated façade lighting', 'Contemporary entrance gate'],
    'Render of a multi-storey residence with stone cladding, vertical timber fins and a pergola-covered terrace'),
  real('layered-volumes-house', 'Layered Volumes House', 0, 'Residential Architecture', 'Contemporary Modern',
    'A contemporary residence defined by layered geometric volumes, bold framed windows, and a sophisticated palette of warm neutrals and charcoal accents. Projecting balconies, textured façade finishes, and integrated greenery add depth and character, while the clean architectural lines create a cohesive balance between modern aesthetics, privacy, and everyday functionality.',
    ['Projecting window frames', 'Textured cladding', 'Cantilevered balconies', 'Glass railings', 'Rooftop greenery', 'Minimalist boundary wall design'],
    'Render of a multi-storey residence with projecting window frames, textured cladding and rooftop greenery'),
  real('cantilever-house', 'Cantilever House', 0, 'Residential Architecture', 'Modern Contemporary',
    'A modern residence characterized by clean geometric forms, bold horizontal projections, and a refined neutral palette. The interplay of textured finishes, expansive glazing, and warm wooden accents creates a sophisticated architectural identity, complemented by a contemporary compound wall that ensures privacy while maintaining visual harmony.',
    ['Geometric façade', 'Double-height vertical glazing', 'Cantilevered roof projections', 'Glass balcony railings', 'Wooden accent fins', 'Contemporary boundary wall'],
    'Render of a modern residence with cantilevered roof projections, tall glazing and a patterned compound wall'),
  real('concrete-charcoal-house', 'Concrete & Charcoal House', 0, 'Residential Architecture', 'Modern Minimalist',
    'A sophisticated residence defined by strong geometric forms, clean horizontal lines, and a balanced palette of concrete textures, crisp white surfaces, and charcoal accents. Expansive glass balconies, warm wood detailing, and a sculptural façade composition create a contemporary home that embodies understated luxury, natural light, and functional elegance.',
    ['Textured concrete façade', 'Bold charcoal frames', 'Cantilevered balconies', 'Glass railings', 'Wood-finish soffits', 'Minimalist landscape design'],
    'Render of a minimalist three-storey residence with a concrete façade, charcoal frames and glass balconies'),
];

// Build-time validation
const seen = new Set<string>();
for (const p of projects) {
  if (seen.has(p.slug)) throw new Error(`Duplicate project slug: ${p.slug}`);
  seen.add(p.slug);
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Bad slug: ${p.slug}`);
  if (!['Architecture', 'Interior'].includes(p.category)) throw new Error(`Bad category: ${p.slug}`);
  for (const f of [p.cover, ...p.gallery.map((g) => g.src), p.beforeAfter?.before, p.beforeAfter?.after].filter(Boolean) as string[])
    if (!fs.existsSync(path.join('public', f))) throw new Error(`Missing image for ${p.slug}: ${f}`);
}
export const featured = projects.filter((p) => p.featured).sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99)).slice(0, 4);
export const related = (p: Project) =>
  [...projects.filter((o) => o.slug !== p.slug && o.category === p.category), ...projects.filter((o) => o.slug !== p.slug && o.category !== p.category)].slice(0, 3);