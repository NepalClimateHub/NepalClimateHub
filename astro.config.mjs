import { defineConfig } from 'astro/config';
import icon from "astro-icon";
import sitemap from '@astrojs/sitemap';
import net0Integration from './toolbar/integration.ts';
import cloudflare from '@astrojs/cloudflare';


import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://net0.grant.codes',
  output: 'server',
  adapter: cloudflare(),
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [net0Integration, sitemap(), [icon()], react()]
});