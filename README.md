# PitStop Apex RS — editable site

A static **Eleventy** site for the PitStop Apex RS landing page, with a browser-based
content editor (**Decap CMS**) so you can change text and swap images without touching code.

Hosting: **Netlify** (auto-builds + deploys on every push / CMS save).

---

## How it's wired

```
site/
├─ src/
│  ├─ index.njk            ← the page template (HTML/CSS, pulls in content)
│  ├─ _data/content.json   ← ALL editable copy + image paths (single source of truth)
│  ├─ assets/              ← logo, images, and CMS uploads (/assets/uploads)
│  └─ admin/               ← the editor UI  (index.html + config.yml)
├─ .eleventy.js            ← build config
├─ netlify.toml            ← Netlify build command + publish dir
└─ package.json
```

- **Editing text/images** happens in `src/_data/content.json`.
  Eleventy bakes that JSON into the HTML at build time — so the published page is
  fully static (great for speed + SEO), no flash of un-styled content.
- The **CMS** (`/admin`) is just a friendly form on top of that JSON. When you save,
  it commits the change to the repo and Netlify rebuilds automatically.

---

## Run it locally

```bash
cd site
npm install
npm run dev      # → http://localhost:8080  (live-reloads)
npm run build    # → outputs the static site to site/_site
```

---

## Deploy to Netlify

1. Push this `site/` folder to a GitHub repo (root of the repo = this folder,
   or set Netlify's **base directory** to `site`).
2. In Netlify → **Add new site → Import from Git** → pick the repo.
   Build settings are read from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `_site`
3. Deploy. Your page is live.

---

## Turn on the editor (`/admin`)

The CMS uses Netlify's **git-gateway** so you can log in and edit without a GitHub
account. One-time setup in the Netlify dashboard:

1. **Site configuration → Identity → Enable Identity.**
2. Under Identity → **Registration**, set to **Invite only** (so randoms can't sign up).
3. Identity → **Services → Git Gateway → Enable Git Gateway.**
4. Identity → **Invite users** → invite your own email, accept the email, set a password.
5. Visit `https://YOUR-SITE.netlify.app/admin/` and log in. Edit away — saves commit
   to the repo and the site rebuilds in ~30s.

> Prefer to skip Netlify Identity and log in with GitHub directly? Open
> `src/admin/config.yml` and replace the `backend:` block with the GitHub one noted
> in the comments there (needs a GitHub OAuth app).

---

## What you can edit from `/admin`

Hero (image + headline + tags), Intro & benefit bullets, the "For Drivers"
statement, all six feature callouts + the centre tire image, Brand DNA cards,
Availability (number, copy, image), the two resource download cards (incl. their
file links), the CTA, the accent colour, and footer/social links.

**Note on lists:** the layout expects **5 benefit bullets, 6 feature items, 2 DNA
cards, 2 resource cards**. You can freely edit their text/images; if you add or
remove *items*, tweak the layout in `src/index.njk` to match.

---

## Swapping the placeholder images

The four image areas currently show labelled placeholder graphics
(`/assets/ph-*.png`). Replace them by uploading real photos in `/admin` (the image
fields), or drop files into `src/assets/` and point the JSON at them.
Recommended: hero ≈ 2000×1120, product/tire ≈ square, availability ≈ 1120×700.
