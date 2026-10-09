import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { studio } from './src/config/studio.ts';
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  ...(studio.siteUrl ? { site: studio.siteUrl } : {}),
  vite: { plugins: [tailwindcss()] },
});
