import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'
import net0Integration from './toolbar/integration.ts'

// https://astro.build/config
export default defineConfig({
  site: 'https://net0.grant.codes',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    net0Integration,
    sitemap(),
  ],
})
