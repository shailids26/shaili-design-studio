import { studio } from '../config/studio';
import { projects } from '../data/projects';
export function GET() {
  const base = studio.siteUrl.replace(/\/$/, '');
  const paths = ['/', '/projects/', '/studio/', '/services/', '/contact/', '/privacy/', ...projects.map((p) => `/projects/${p.slug}/`)];
  const body = base ? paths.map((p) => `<url><loc>${base}${p}</loc></url>`).join('') : '';
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`, { headers: { 'Content-Type': 'application/xml' } });
}
