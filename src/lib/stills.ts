import type { ImageMetadata } from 'astro';

/**
 * Two separate image sets, resolved at build time so Astro can emit responsive
 * srcsets in modern formats.
 *
 *   src/assets/stills/<slug>/   real photography. Drives the stills sequence on
 *                               a project page, and is preferred for the index.
 *   src/assets/posters/<slug>/  one frame per film, in film order. A poster is
 *                               always a frame from the film it sits in front
 *                               of, so its aspect ratio matches and the play
 *                               control lands where you expect.
 *
 * A project with no stills simply shows no stills sequence. A project with no
 * posters falls back to its key still.
 */
function index(glob: Record<string, { default: ImageMetadata }>) {
  const bySlug = new Map<string, ImageMetadata[]>();
  for (const path of Object.keys(glob).sort()) {
    const slug = path.split('/').at(-2);
    if (!slug) continue;
    const list = bySlug.get(slug) ?? [];
    list.push(glob[path].default);
    bySlug.set(slug, list);
  }
  return bySlug;
}

const stills = index(
  import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/stills/**/*.{jpg,jpeg,JPG,png,webp,avif}',
    { eager: true },
  ),
);

const posters = index(
  import.meta.glob<{ default: ImageMetadata }>(
    '/src/assets/posters/**/*.{jpg,jpeg,JPG,png,webp,avif}',
    { eager: true },
  ),
);

/** Real stills for a project, in filename order. Empty is normal. */
export function stillsFor(slug: string): ImageMetadata[] {
  return stills.get(slug) ?? [];
}

/** Poster frames, one per film, in the same order as `films` in the data. */
export function postersFor(slug: string): ImageMetadata[] {
  return posters.get(slug) ?? [];
}

/** The poster for film `i`, falling back to the key still. */
export function posterFor(
  slug: string,
  i: number,
  keyStill?: number,
): ImageMetadata | undefined {
  return postersFor(slug)[i] ?? keyStillFor(slug, keyStill);
}

/**
 * The one image that represents a project on the index. Real photography wins;
 * otherwise the first poster frame stands in.
 * `keyStill` is 1-based to match the filenames on disk.
 */
export function keyStillFor(slug: string, keyStill = 1): ImageMetadata | undefined {
  const list = stillsFor(slug);
  return list[keyStill - 1] ?? list[0] ?? postersFor(slug)[0];
}
