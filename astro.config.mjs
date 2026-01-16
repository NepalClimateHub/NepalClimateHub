import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import net0Integration from "./toolbar/integration.ts";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  site: "https://nepalclimatehub.org",
  output: "server",
  i18n: {
    defaultLocale: "en",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [net0Integration, sitemap(), [icon()], react()],
  adapter: node({
    mode: "standalone",
  }),
  vite: {
    envPrefix: "PUBLIC_",
    resolve: {
      alias: {
        "@layouts": "/src/layouts",
        "@components": "/src/components",
        "@assets": "/src/assets",
        "@i18n": "/src/i18n",
        "@styles": "/src/styles",
        "@pages": "/src/pages",
      },
    },
  },
});
