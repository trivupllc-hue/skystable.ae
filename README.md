# Sky Stable

A complete React + Vite + TypeScript website for **Sky Stable, Sharjah, UAE**. It uses Tailwind CSS, custom responsive CSS, Lucide icons, Framer Motion, React Router, React Hook Form and Zod. No backend, database, payment service or paid API is required.

The configured WhatsApp and call number is **+971 55 978 5604**. The owner-supplied [Google Maps pin](https://maps.app.goo.gl/kfdHwSP7U9QduTgXA) is used throughout. The original brief mentioned Ajman; the owner corrected the business location to Sharjah, so primary copy, routes and SEO use Sharjah. Ajman and Dubai appear only as nearby areas.

## Preview locally

Install Node.js **24 LTS** (Node 22.12+ is also supported). Open a terminal in this folder:

```sh
cd /Users/apple/Desktop/skystable
npm install
npm run dev
```

Open the Local URL printed by Vite, normally **http://localhost:5173**. If the port is busy, Vite prints another port. Press Control+C in that terminal to stop the server.

## Production build and checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run verify:build
npm run preview
```

The production preview normally runs at **http://localhost:4173**. `npm run build` creates `dist/`, including **14 prerendered routes, a custom 404, robots.txt and sitemap.xml**. The `.prerender/` directory is only an intermediate build artifact and is not deployed. React hydrates the complete static pages to enable forms, navigation, the gallery and FAQ.

`npm run format` formats the source. `npm run check:launch` checks required owner settings. The owner-confirmed canonical domain is **https://skystable.ae**, configured in `src/data/site.ts`.

Tests cover Dubai date rollover, past dates/times, impossible dates, rider totals, contact validation, URL encoding, service selection, booking and selling form handoffs, gallery navigation and FAQ controls. WhatsApp is mocked in automated tests: tests do **not** send messages or create real bookings.

## Before public launch

1. The canonical domain is configured as **https://skystable.ae**. Production builds generate absolute canonical and social preview URLs, indexable pages and a populated sitemap for this domain. The Cloudflare deployment configuration connects this domain to the website. `VITE_SITE_URL`, if set, overrides `site.seo.baseUrl`; keep it consistent with this domain.
2. Confirm service descriptions and preferred request slots with the owner. Package cards are clearly described as **enquiry ideas**, not confirmed products. Prices are “Request Price” until supplied.
3. Replace illustrative photography with approved Sky Stable media when available, and update its captions/credits and stock-image disclosures accordingly. Current images are licensed Pexels stock and are explicitly labeled. They are not claimed as Sky Stable facilities, team members or horses.
4. Add only verified opening hours, social profiles, trainer biographies, reviews and genuine sale listings. Empty values are intentionally omitted or shown as honest empty states.
5. Preview desktop and mobile, then complete a real test request with the business owner: prepare the message, inspect the recipient, tap Send yourself in WhatsApp, and confirm receipt with Sky Stable.

**Verification limit:** the connected browser failed before it could load the local site during this build session. Automated DOM interaction tests and generated-page checks are included; real-browser visual layout, touch gestures, popup behavior and Core Web Vitals still need a manual pass. No performance scores are claimed.

## Owner settings: one place for business details

Edit **`src/data/site.ts`**. Save, commit and redeploy.

| Setting                                    | What to enter                                                                                         |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `site.name`, `location`, `city`, `country` | Verified business identity and location                                                               |
| `site.whatsappNumber`                      | Digits only, country code included, e.g. the current `971559785604`                                   |
| `site.callNumber`                          | International number starting with `+`                                                                |
| `site.displayPhone`                        | Human-readable version of the same number                                                             |
| `site.mapUrl`                              | Exact verified Google Maps link                                                                       |
| `site.streetAddress`                       | Verified street address, or leave empty                                                               |
| `site.openingHours`                        | Verified schema-compatible hours, e.g. `Mo-Su 06:00-18:00` **only if accurate**                       |
| `site.socials`                             | Full Instagram, TikTok and YouTube profile URLs; blank profiles are hidden                            |
| `site.seo.baseUrl`                         | Verified HTTPS origin, without a path or trailing slash                                               |
| `site.rideTimeSlots`                       | Suggested enquiry times in 24-hour `HH:mm` format, Dubai time                                         |
| `site.durations`                           | Session durations visitors may request                                                                |
| `site.policies`                            | Owner-approved booking, cancellation and beach guidance                                               |
| `services`, `serviceTypes`                 | Service content, routes and booking options                                                           |
| `packages`                                 | Package names, requested durations, level, rider arrangements, discussion points and confirmed prices |
| `site.trainers`, `site.reviews`            | Genuine information approved for publication                                                          |

Keep route slugs stable after launch. If you change one, update the relevant navigation links and add a redirect from the old route in `public/_redirects`. Editing business text alone does not require a route change.

### Change package prices

In `src/data/site.ts`, find a package and replace `price: null` with an approved display string, such as `price: "AED … per rider"` using the actual price. Confirm all conditions before adding them. Keep `null` to display “Request Price”. Package buttons automatically include the package name in the enquiry.

### Update photographs and gallery

1. Put approved optimized WebP photographs in `public/images/`.
2. The reusable image component expects two files per image ID: `name-640.webp` and `name-1200.webp`. The homepage hero also needs `hero-1920.webp`. Maintain consistent crops/aspect ratios across variants. Record the 1200px variant’s width and height in its `credits.json` entry so the gallery reserves the correct space before loading. The current hero is approximately 1.745:1; other images can be portrait or landscape.
3. Edit the gallery titles, category and descriptive alt text in `src/data/content.ts` → `gallery`.
4. Service cards use image IDs in `src/data/site.ts` → `services`.
5. Update attribution in `public/images/credits.json` and the Photography Credits page. When replacing stock with real media, update the related stock disclosures in the image descriptions, gallery, homepage, privacy/credits copy and footer. Do not remove disclosures for images that remain stock.

Use media you own or have permission to publish. Do not upload client information, license documents or sensitive records into `public/`.

### Add genuine horse listings

Edit `src/data/horses.ts`. It starts with an empty array to avoid fictitious horses. Add records that satisfy `HorseListing`: `id`, `name`, `image` (a local image path), `breed`, `age`, `gender`, `training`, `location`, optional `price`, and `description`. The site renders the listing layout automatically. Confirm information and photo rights before publishing. Seller enquiries do not automatically create listings.

### Booking behavior

- Every booking CTA links to `/book` and preselects the relevant service. Package CTAs also include the package name in special requests.
- Required fields are validated with Zod and React Hook Form. Adults plus children must equal the total number of riders.
- Calendar dates and past preferred times are validated using **Asia/Dubai (UTC+4)**. Request slots are not inventory or guaranteed availability.
- Submission URL-encodes the details into `https://wa.me/<configured-number>?text=...` and attempts to open WhatsApp. An explicit “Continue to WhatsApp” link remains if a browser blocks the new window.
- The visitor must tap **Send** in WhatsApp. The website does not report the request as sent or confirmed. Sky Stable must reply to confirm availability, meeting point, pricing and instructions.
- The site does not store enquiries. Form details exist in page memory and are passed to WhatsApp only during the handoff. Refreshing or leaving the page can clear them.
- For stable or trading enquiries, the booking form explains how to use one adult as the person enquiring. The dedicated horse-selling form collects horse details instead.

## GitHub repository

The source is published at **https://github.com/trivupllc-hue/skystable.ae** on the `main` branch. This local checkout is already connected to that repository. After editing files, publish updates with:

```sh
git add .
git commit -m "Update Sky Stable website"
git push
```

### Initial setup for a new checkout

Create an empty repository in your GitHub account (without auto-adding a README or license). Then run these commands from this project directory, replacing the URL with your repository URL:

```sh
git init
git add .
git commit -m "Build Sky Stable website"
git branch -M main
git remote add origin https://github.com/trivupllc-hue/skystable.ae.git
git push -u origin main
```

Authenticate using GitHub’s normal browser or credential-manager flow. Do not paste tokens into project files. `.gitignore` excludes dependencies, build outputs, `.env` files and local hosting-tool state. Keep `package-lock.json` in Git for reproducible installs. If you already have a repository, skip `git init` and `git remote add` and use the existing remote.

## Deploy to Cloudflare (current hosting)

The website uses **Cloudflare Workers Static Assets**, application name **`skystable-ae`**. Your domain remains registered at nic.ae and Cloudflare manages its DNS and HTTPS. No Vercel account is needed. This is a static deployment: no Worker script, database or server application is required.

`wrangler.jsonc` selects the existing Cloudflare account, uploads `dist/`, connects `skystable.ae` and `www.skystable.ae`, serves clean URLs and returns the custom 404 for unknown pages. The canonical domain is **https://skystable.ae**. Public `workers.dev` and version-preview URLs are disabled.

To deploy a change from this checkout:

```sh
npm run deploy
```

This rebuilds the site, checks the generated pages and uploads them using the pinned Cloudflare Wrangler CLI. It uses your existing Cloudflare login. On a new computer, run `npm ci`, then `npx --yes wrangler@4.160.1 login` and sign into the Cloudflare account that owns this domain before deploying. Never commit credentials.

Save source changes to GitHub with `git add`, `git commit` and `git push` as described above. **GitHub pushes do not automatically deploy yet**; run `npm run deploy` to publish. Automatic deployment can be connected later in Cloudflare's application settings after the owner authorizes the `trivupllc-hue/skystable.ae` GitHub integration.

The `public/_headers` file supplies response-security and hashed-asset cache headers. All routes have actual HTML, so no blanket SPA fallback is needed. The committed `.node-version` selects Node.js 24 for compatible build environments. `vercel.json` is optional and is not used by Cloudflare.

After deployment, check the homepage, a direct service-page URL, `/book`, `/robots.txt` and `/sitemap.xml`. Submit the sitemap in Google Search Console after domain verification.

Official guides: [static assets](https://developers.cloudflare.com/workers/static-assets/), [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [HTML handling](https://developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/), [response headers](https://developers.cloudflare.com/workers/static-assets/headers/).

## Optional alternative: Vercel

1. Sign in at [Vercel](https://vercel.com/new), choose **Add New → Project**, and import your GitHub repository.
2. Select the **Vite** framework preset and Node.js **24.x**. Use the repository root as the Root Directory.
3. Build command: **`npm run build`**. Output directory: **`dist`**. Install command: **`npm ci`**.
4. Set `VITE_SITE_URL` to the final production HTTPS origin if you did not set `site.seo.baseUrl`. The value is public and is not a secret. Leave it unset on previews unless you want them to use the production canonical URL.
5. Deploy. Open the returned deployment URL and check the homepage, a directly loaded service route, the gallery and `/book`.
6. Each subsequent push to `main` triggers a production redeployment. Pull requests can generate preview deployments.

`vercel.json` is included. It serves the prerendered directories as real pages, keeps hashed assets cacheable and sets basic response-security headers. A blanket SPA rewrite is intentionally unnecessary: every public route has its own HTML, and unknown URLs should receive the custom 404 instead of a soft 404 homepage.

Official references: [Vite deployment on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel project configuration](https://vercel.com/docs/project-configuration), [Vite production deployment](https://vite.dev/guide/static-deploy.html).

### Custom domain if using Vercel

1. Open the Vercel project → **Settings → Domains** and add the domain you own.
2. Follow the exact DNS records Vercel shows at your domain registrar. Do not copy IP addresses from an old guide; use the records displayed for your project.
3. Add both apex and `www` if desired, then set your preferred canonical domain and redirect the other to it.
4. Wait for Vercel to verify DNS and provision HTTPS.
5. Set the same preferred HTTPS origin in `site.seo.baseUrl` or `VITE_SITE_URL`, redeploy, and run `npm run check:launch` locally with the same setting.
6. Open `/robots.txt` and `/sitemap.xml` on the live domain. Confirm canonicals point to that origin. Submit the sitemap to Google Search Console after domain verification.

Official guide: [Adding a domain to Vercel](https://vercel.com/docs/domains/working-with-domains/add-a-domain).

## Project structure

```text
src/data/site.ts           Business, contact, service and package settings
src/data/content.ts        FAQs and gallery entries
src/data/horses.ts         Genuine horse listings
src/components/           Reusable UI, booking, trading and gallery components
src/pages.tsx             Marketing and service pages
src/lib/booking.ts        Validation, Dubai dates, WhatsApp message builders
src/lib/seo.ts            Per-route metadata and verified structured data
src/styles.css            Responsive black, gold and ivory visual system
scripts/prerender.mjs      Static HTML, sitemap and robots generation
scripts/verify-build.mjs   Generated-page, metadata, link and asset checks
scripts/check-launch.ts    Owner configuration checks
public/images/            Local optimized media and photo source credits
tests/                    Business-rule and DOM interaction tests
public/_headers           Cloudflare static response headers
wrangler.jsonc            Cloudflare deployment and custom domains
.node-version             Node version for Cloudflare builds
vercel.json               Optional Vercel deployment settings
```

No bookings are collected by a server, no email is sent, and no testimonials, credentials, ratings, prices or horse listings are invented. All fonts and images are hosted locally; there are no analytics or embedded map trackers in this initial version.
