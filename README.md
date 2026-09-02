# Pieter Steyn — Director of Photography & Colourist

A static site built with [Astro](https://astro.build). No CMS, no database, no
build-time services. Everything the site shows comes from one data file and one
folder of images.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve the built site
```

---

## Adding a project

This is the whole process. There is no page to author.

1. Put the stills in `src/assets/stills/<slug>/`, named `01.jpg`, `02.jpg`, …
   Page order follows the filenames.
2. Add one object to the array in [`src/data/projects.ts`](src/data/projects.ts).
3. Run `npm run build`.

The index row, the `/projects/<slug>` page, the routing, the responsive image
sizes and the prev/next links are all generated from that one entry.

```ts
{
  title: 'New Project',
  slug: 'new-project',        // becomes /projects/new-project
  client: 'Some Magazine',    // optional — omit for personal work, or when
                              // it just repeats the title
  date: '2026-04-18',       // sorts the index; only the year shows
  category: 'fashion film',
  roles: ['Director of Photography', 'Colourist'],
  colourFeature: true,        // shows the small colour marker on the index
  films: [{ src: 'https://…r2.dev/new-project/film.mp4' }],
  keyStill: 2,                // which still represents it on the index
  archiveStill: 4,            // which still appears in the homepage archive
  credits: [{ role: 'Director', name: '…' }],
}
```

Set `draft: true` to keep an entry out of the index without deleting it.
Set `frameOnly: true` when there are no stills and the one image is a frame
pulled from the film — the project then shows its film but no stills sequence.

**Order is automatic.** The index sorts by `date`, newest first, so a new entry
can go anywhere in the array.

**Films stay on R2.** They are referenced by URL and never enter the repo, so
the repository stays small and the homepage never touches them.

---

## How it is put together

```
src/data/projects.ts          the single source of truth
src/lib/stills.ts             maps slug → images, at build time
src/styles/system.css         margins, grid, type scale, colour — defined once
src/layouts/Base.astro        page shell, masthead, footer
src/components/
  Masthead.astro              the entire navigation: two links
  ProjectIndex.astro          the index — the list is the design
  Archive.astro               the homepage stills sequence
  Film.astro                  poster + click-to-play, preload="none"
src/pages/
  index.astro                 homepage — no video, by design
  projects/[slug].astro       one page per project, generated
  information.astro
  format-block.txt.ts         generates the snippet for the Format site
```

### Design rules the code enforces

- **No video on the homepage.** Not lazily, not muted, not at all.
- **Nothing loads until asked.** Project films are `preload="none"` behind a
  poster frame; not one byte is fetched until someone presses play.
- **Images keep their native aspect ratio.** No `object-fit: cover`, no fixed
  boxes, no rounded corners, no borders, no shadows.
- **Hierarchy comes from position, not scale.** Every column of the index uses
  the same size and weight. Nothing on the site is large except photography.
- **The interface has no colour.** The palette is neutral so the grades supply
  every colour on the page.

---

## Deploying

The build output is plain static files in `dist/`. Any host works.

**Cloudflare Pages / Netlify / Vercel** — connect the repo, or drag `dist/` in.

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22+ |

Then point `pietergsteyn.com` at the host and the Format subscription is no
longer needed.

---

## The Format block (interim)

`npm run build` also writes **`dist/format-block.txt`** — a single
self-contained HTML/CSS/JS snippet for the existing Format site. Paste it into a
Format *Embed / Custom HTML* block.

It is generated from the same `projects.ts`, so the two cannot drift.

**It needs the stills on R2 first:** upload `r2-upload/stills/` to the bucket
root so files sit at `<bucket>/stills/<slug>/01.jpg`. The films are already
there. The standalone site does not need this upload.

Its one real limitation: project pages are addressed by hash
(`pietergsteyn.com/#/nadir`) rather than a real path. Back button and refresh
work, but for proper `/projects/nadir` URLs use the standalone build above.

---

## Outstanding

Nothing blocking. All 18 projects have confirmed titles, clients, categories,
roles and dates, and all 29 films play from R2.

- Credits exist for 7 projects (production companies and directors). The other
  11 have none — add them to the `info.txt` files in `_incoming/` any time.
- `Farm` has a real year (2024) but no day, so its `date` uses `2024-01-01`
  purely to sort. It only affects position among the other 2024 projects.
- `elisa/Elisa_02.mov` is 1920x1080 but carries PCM audio in a QuickTime
  container, which Chrome and Firefox will not play. The site uses the older
  1280x720 `Elsa.mp4`. Re-export as MP4/AAC to upgrade it.
- Earth Age's two reels carry the burned-in "EARTH AGE" title for their whole
  duration. Kept deliberately.
