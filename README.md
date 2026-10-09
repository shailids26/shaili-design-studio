# Shaili Design Studio website

Astro (static) + Tailwind v4 + GSAP, hosted on Netlify; enquiries delivered by Web3Forms.

## Run locally
```
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/
npm run preview    # serve the built site
npm run check      # type check
```
Node 22 (see `.nvmrc`). Local preview does NOT prove enquiries or email work; only a deployed Netlify site does.

## Owner details (one file)
Edit `src/config/studio.ts`: founder, email, phone, WhatsApp (digits with country code), Instagram/LinkedIn/Pinterest URLs, and `siteUrl` (enables canonical URLs and the sitemap). Empty values are hidden everywhere.

## Projects
All in `src/data/projects.ts` (annotated `mk(...)` helper = sample shape).
- **Add:** add an entry, put images in `public/images/<slug>/`, set `demo: false` for real work. Slugs, categories and image paths are validated at build; the build fails if wrong.
- **Choose the 4 featured:** set `featured`/`featuredOrder` (1–4).
- **Replace photos:** put real files in `public/images/…` and update the paths. Use ~1600px-wide JPG/WebP for covers and gallery; keep originals out of the repo.
- **Before/after slider:** add `beforeAfter` with a matched pair; omitted otherwise.
- Current images are generated SVG placeholders (`node scripts/make-placeholders.mjs`), labelled illustrative. No stock photos are used, so there is no third-party licensing to credit.
- Social preview images are not set (no real photo yet): add an `og:image` in `src/layouts/Base.astro` once you have one.

## Deploy on Netlify (needs your account)
**Git (recommended):** push to GitHub → Netlify → *Add new site → Import from Git*. Settings come from `netlify.toml` (build `npm run build`, publish `dist`, Node 22).
**Manual:** run `npm run build`, then drag the **`dist`** folder into Netlify *Sites → Add new site → Deploy manually*. (Note: manual uploads still detect forms in the built HTML.)
After first deploy: enquiries use **Web3Forms** (free, 250/month at time of writing; check their pricing page), not Netlify Forms.
1. Go to web3forms.com → create a form, enter the inbox for enquiries, verify it by email, and copy the **access key**.
2. Paste it into `web3formsKey` in `src/config/studio.ts`, then commit and push (or rebuild and re-upload `dist`).
3. Open the live `/contact/` page, send one test enquiry and confirm the email arrives (check spam). Reply to the client using the address in the email's **email** field.
4. Optional: *Domain management → Add a domain* in Netlify (HTTPS is automatic), then set `siteUrl` and redeploy.
Rollback: *Deploys → pick an earlier deploy → Publish deploy*.

No tokens or passwords are in this repository; keep it that way.