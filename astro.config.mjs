import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import { defineConfig, envField } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';

// Dokploy runs a Node server; the GitHub Action deploys to Cloudflare Workers
// and sets DEPLOY_TARGET=cloudflare.
const isCloudflare = process.env.DEPLOY_TARGET === 'cloudflare';

// https://astro.build/config
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  site: 'https://nepalclimatehub.org',
  output: 'server',
  devToolbar: {
    enabled: false,
  },
  env: {
    schema: {
      // `context: 'client'` because src/api/index.ts is isomorphic: it is pulled into
      // the browser bundle via VolunteerOpenRoles.tsx (client:load). The value is
      // inlined at build time from `.env` and is public anyway.
      API_BASE_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'https://api.cms.nepalclimatehub.org',
      }),
      // Secrets: read at runtime from the Worker env. Set with `wrangler secret put`,
      // and mirror them in `.dev.vars` for local dev. Read via `getSecret('NAME')`.
    },
  },
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [
    sitemap({
      customSitemaps: [
        'https://nepalclimatehub.org/blogs/sitemap.xml',
        'https://nepalclimatehub.org/opportunities/sitemap.xml',
        'https://nepalclimatehub.org/events/sitemap.xml',
      ],
    }),
    [icon()],
    react(),
  ],
  adapter: isCloudflare
    ? cloudflare({
        imageService: 'compile',
        platformProxy: {
          enabled: true,
        },
      })
    : node({ mode: 'standalone' }),
  vite: {
    server: {
      allowedHosts: ['nepalclimatehub.org', '.nepalclimatehub.org'],
    },
    resolve: {
      alias: {
        '@layouts': '/src/layouts',
        '@components': '/src/components',
        '@assets': '/src/assets',
        '@i18n': '/src/i18n',
        '@styles': '/src/styles',
        '@pages': '/src/pages',
      },
    },
  },
});
