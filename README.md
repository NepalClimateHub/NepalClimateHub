## 🌍 Welcome to NepalClimateHub

NepalClimateHub is dedicated to being a centralized platform that educates, connects, and empowers Nepal’s young people with climate champions, climate-based organizations, timely information and resources, opportunities, and practical guidance to address pressing climate challenges through individual and collective action.

## 🛠️ Tech Stack

We crafted NepalClimateHub using a modern, efficient tech stack:

- **Astro with ReactJS**: For a dynamic, responsive user interface
- **CSS**: To ensure the platform is visually appealing and user-friendly
- **Cloudflare Workers**: For robust deployment and fast, secure access

## 🔮 Features

- 📚 Access a wealth of climate-related information and resources
- 🌐 Connect with climate champions and organizations
- 📅 Stay updated with timely information and opportunities
- 🛠️ Practical guidance for individual and collective climate action
- 📱 Responsive design for a seamless experience on all devices

## 🏃‍♂️ Getting Started

Want to explore NepalClimateHub locally? Follow these steps:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/nepalclimatehub.git
   ```

2. Navigate to the project repository:

   ```bash
   cd nepalclimatehub
   ```

3. Setup postgres db or use docker

   ```bash
   start postgres or
   docker compose up
   ```

4. Setup env file and fill the environment
   ```bash
   cp .env.example .env
   ```
   
6. Run the application
   ```bash
   npm run dev
   ```

## ☁️ Deployment (Cloudflare Workers)

The site is an Astro SSR app (`output: 'server'`) built with `@astrojs/cloudflare` and deployed
to Cloudflare Workers with static assets. Configuration lives in `wrangler.jsonc`.

1. Authenticate once:

   ```bash
   npx wrangler login
   ```

2. Preview the real Worker locally (build + workerd runtime):

   ```bash
   npm run preview
   ```

3. Deploy:

   ```bash
   npm run deploy
   ```

Notes:

- `dist/_worker.js` is the Worker entry; everything else in `dist/` is uploaded as static
  assets. `public/.assetsignore` keeps `_worker.js` and `_routes.json` out of the asset bundle.
- `API_BASE_URL` is read through `import.meta.env`, so it is inlined at **build** time. Set it in
  `.env` locally, or as a build environment variable if building on Cloudflare Workers Builds.
  The same value is also exposed as a runtime `var` in `wrangler.jsonc` for `Astro.locals.runtime.env`.
  Use `npx wrangler secret put <NAME>` for anything sensitive.
- Run `npm run cf-typegen` after changing bindings in `wrangler.jsonc` to regenerate
  `worker-configuration.d.ts` (gitignored).

## 🤝 Contributing

Got ideas to enhance NepalClimateHub? We welcome your contributions! Whether it's fixing a bug or adding new features, check the CONTRIBUTING.md file for more instructions on how to contribute!

## 🌐 Visit the Hub

Ready to dive in? Visit the [NepalClimateHub](https://nepalclimatehub.org/) and start accessing climate-related resources today!

## 📣 Spread the Word

If you find NepalClimateHub valuable, share it with your friends and fellow climate enthusiasts!

[Twitter](#) | [Facebook](#) | [LinkedIn](#)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

The goal for this project is to create a free to use starter kit for creating low emission, sustainable websites.

## URLs

Staging : https://nch-staging.netlify.app
Production: https://nepalclimatehub.org
