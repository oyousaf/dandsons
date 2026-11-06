// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://dandsons.legxcysol.dev',
  trailingSlash: 'never',
  devToolbar: { enabled: false },
  build: { format: 'file' },
  adapter: vercel(),
  integrations: [react(), sitemap()],
  // Old URLs are the business's SEO asset: tidy the broken ones, keep everything else as it is.
  redirects: {
    '/contac': '/contact',
    '/services/fensepillar': '/bedford-fence-contractor',
    '/bedford-patio-services': '/patio-services-bedford',
    '/our-works/2': '/our-works',
    '/our-works/3': '/our-works',
    '/our-works/4': '/our-works',
    '/our-works/5': '/our-works',
  },
  vite: { plugins: [tailwindcss()] },
});
