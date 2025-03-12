import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import net0Integration from './toolbar/integration.ts';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://nepalclimatehub.org',
  output: 'server',
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [net0Integration, sitemap(), [icon()], react()],
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()],
  },
});
