# Shaili Design Studio website

Astro (static) + Tailwind v4 + GSAP, hosted on Netlify with Netlify Forms.

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
After first deploy:
1. *Project → Forms*: confirm **studio-enquiry** is listed. If not, enable form detection (Forms → Enable form detection) and redeploy.
2. Submit one test enquiry on the live `/contact/` page; confirm it appears under Forms → Submissions.
3. *Forms → Form notifications → Add notification → Email notification*: choose **studio-enquiry** and enter the owner's inbox. Test it.
4. Replies: Netlify's notification is not from the client. Reply to the address in the **email** field of the notification, not to Netlify.
5. Review spam under Forms → Verified/Spam. Change the recipient in the same notification settings. Check plan allowances on Netlify's current pricing page (free plans have monthly form limits).
6. Optional: *Domain management → Add a domain*; HTTPS is provisioned automatically. Then set `siteUrl`, redeploy.
Rollback: *Deploys → pick an earlier deploy → Publish deploy*.

No tokens or passwords are in this repository; keep it that way.
