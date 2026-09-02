/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  PROJECTS — the single source of truth for the whole site.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  TO ADD A PROJECT
 *  1. Drop stills into  src/assets/stills/<slug>/    named 01.jpg, 02.jpg, …
 *     and one poster per film into src/assets/posters/<slug>/ in film order.
 *  2. Add one object to the array below.
 *  3. That's it. The index row, the /projects/<slug> page and the routing are
 *     all generated from this file. There is no page to author.
 *
 *  ORDERING
 *  `priority` pins a project to the top of the index, lowest number first.
 *  Everything without a priority follows, newest `date` first.
 *
 *  Titles, clients, categories, roles and credits come from the info.txt files
 *  in _incoming/, confirmed directly with Pieter.
 */

export type Role = 'Director of Photography' | 'Colourist' | 'Director' | 'Editor';

export interface Film {
  /** Absolute URL. Films stay on R2 — they never enter the repo. */
  src: string;
  /** Optional label when a project holds more than one film. */
  label?: string;
}

export interface Project {
  title: string;
  slug: string;
  /** Client, magazine or brand. Suppressed when the title already says it. */
  client?: string;
  /** ISO date — used for sorting only. Only the year is ever displayed. */
  date: string;
  /** One quiet word: fashion film, editorial, beauty, portrait, campaign. */
  category: string;
  roles: Role[];
  /** Pins to the top of the index. Lower number = higher up. */
  priority?: number;
  /**
   * Set true where the project is a deliberate showcase of the grade.
   * Surfaces a restrained colour marker on the index.
   */
  colourFeature?: boolean;
  /** 1–2 sentences. Shown small, under the title. Optional by design. */
  description?: string;
  films: Film[];
  /** Credits: free-form label/value pairs, rendered as a small mono block. */
  credits?: { role: string; name: string }[];
  /** Which still (1-based, by filename order) represents the project. */
  keyStill?: number;
  /** The still shown in the homepage archive. Defaults to keyStill. */
  archiveStill?: number;
  /** Hide from the index without deleting the entry. */
  draft?: boolean;
}

const R2 = 'https://pub-003bea79dbf24f299dc6fcfb58cf18ba.r2.dev/';

/**
 * Build an R2 URL from a readable path. Encoding is handled here so the paths
 * below stay legible — several contain spaces and a typographic apostrophe.
 */
const r2 = (path: string) => R2 + path.split('/').map(encodeURIComponent).join('/');

export const projects: Project[] = [
  /* ── Pinned, in the order you asked for ─────────────────────────────── */
  {
    title: 'Homey Magazine',
    slug: 'homey-magazine',
    client: 'Homey Magazine',
    date: '2026-07-23',
    category: 'editorial',
    roles: ['Director of Photography', 'Colourist'],
    priority: 1,
    films: [
      { src: r2('Homey Magazine/Oleshe_Page_3.mp4'), label: 'Oleshe — Page 3' },
      { src: r2('Homey Magazine/Tyrone_Page_4.mp4'), label: 'Tyrone — Page 4' },
      { src: r2('Homey Magazine/Loryn_Page_5.mp4'), label: 'Loryn — Page 5' },
      { src: r2('Homey Magazine/Loryn_Page_7.mp4'), label: 'Loryn — Page 7' },
      { src: r2('Homey Magazine/Loryn_Page_9.mp4'), label: 'Loryn — Page 9' },
      { src: r2('Homey Magazine/Oleshe_Page_10.mp4'), label: 'Oleshe — Page 10' },
    ],
    credits: [{ role: 'Production', name: 'Homey Magazine' }],
  },
  {
    title: 'Wild Within',
    slug: 'wild-within',
    client: 'Wild Within',
    date: '2026-01-16',
    category: 'campaign',
    roles: ['Director of Photography', 'Colourist'],
    priority: 2,
    colourFeature: true,
    films: [{ src: r2('WildWithin/2026_01_16_Wildwithin_Final.mp4') }],
    credits: [{ role: 'Production', name: 'Baker&Co' }],
  },
  {
    title: 'Impermanence for Nataal Magazine',
    slug: 'impermanence',
    client: 'Nataal Magazine',
    date: '2025-07-29',
    category: 'editorial',
    roles: ['Director', 'Director of Photography', 'Colourist'],
    priority: 3,
    films: [{ src: r2('impermanence/2025_07_29_Theewaterskloof_Final.mp4') }],
    credits: [{ role: 'Production', name: 'Baker&Co' }],
    keyStill: 1,
    archiveStill: 4,
  },
  {
    title: 'Earth Age',
    slug: 'earth-age',
    client: 'Earth Age',
    date: '2025-04-01',
    category: 'campaign',
    roles: ['Director of Photography', 'Colourist'],
    priority: 4,
    // The two reels carry the burned-in "EARTH AGE" title for their full
    // duration. Kept deliberately — they are there for a reason.
    films: [
      { src: r2('earth-age/2025_04_01_EarthAge_Final_Logo.mp4') },
      { src: r2('earth-age/2025_04_01_EarthAge_Final_Reel1_Logo.mp4'), label: 'Reel 1' },
      { src: r2('earth-age/2025_04_01_EarthAge_Final_Reel2_Logo.mp4'), label: 'Reel 2' },
    ],
    credits: [{ role: 'Director', name: 'Pieter Steyn' }],
    keyStill: 2,
    archiveStill: 1,
  },
  {
    title: 'Airforce Netherlands',
    slug: 'airforce-netherlands',
    client: 'Airforce Netherlands',
    date: '2025-02-27',
    category: 'campaign',
    roles: ['Director of Photography', 'Colourist'],
    priority: 5,
    films: [
      { src: r2('Airforce/2025_02_27_AirForce_Day_01_1920x1080.mp4'), label: 'Day 01' },
      { src: r2('Airforce/2025_02_27_AirForce_Day_02_1920x1080.mp4'), label: 'Day 02' },
    ],
    credits: [{ role: 'Production', name: 'EuroConnection' }],
  },
  {
    title: 'Age of Aquarius',
    slug: 'age-of-aquarius',
    // No client on this one — confirmed.
    date: '2025-05-29',
    category: 'editorial',
    roles: ['Director of Photography', 'Colourist'],
    priority: 6,
    colourFeature: true,
    films: [{ src: r2('age-of-aquarius/2025_05_29_AoA_Final.mp4') }],
    credits: [
      { role: 'Director', name: 'Andy Reeves' },
      { role: 'Producer', name: 'Baker&Co' },
    ],
    keyStill: 2,
    archiveStill: 5,
  },

  /* ── Then these, also pinned ────────────────────────────────────────── */
  {
    title: 'Elisa',
    slug: 'elisa',
    date: '2026-03-25',
    category: 'portrait',
    roles: ['Director of Photography', 'Colourist'],
    priority: 14,
    films: [{ src: r2('Elsa.mp4') }],
    keyStill: 1,
    archiveStill: 3,
  },
  {
    title: 'Batsi',
    slug: 'batsi',
    date: '2025-11-20',
    category: 'portrait',
    roles: ['Director of Photography', 'Colourist'],
    priority: 13,
    films: [{ src: r2('batsi/2025_11_20_Batsi.mp4') }],
    keyStill: 1,
    archiveStill: 1,
  },
  {
    title: 'Schön Magazine x Marshall',
    slug: 'schon-marshall',
    client: 'Schön Magazine',
    date: '2025-10-08',
    category: 'socials',
    // Colour only on this one — confirmed.
    roles: ['Colourist'],
    colourFeature: true,
    films: [{ src: r2('Schön Magazine x Marshall/2025_10_08_SconxMarshall_Thea_9x16_Final.mp4') }],
  },
  {
    title: 'Nadir',
    slug: 'nadir',
    date: '2025-08-14',
    category: 'editorial',
    roles: ['Director', 'Director of Photography', 'Colourist'],
    priority: 8,
    colourFeature: true,
    films: [{ src: r2('nadir/2025_08_14_Nadir_Exports_Final.mp4') }],
    keyStill: 3,
    archiveStill: 2,
  },
  {
    title: 'Avu + Hannah',
    slug: 'avu-hannah',
    date: '2025-05-29',
    category: 'portrait',
    roles: ['Director of Photography', 'Colourist'],
    priority: 7,
    colourFeature: true,
    // Hannah first, then Avu, then the remaining pieces numbered beneath.
    films: [
      { src: r2('avu+hannah/hannah.mp4'), label: 'Hannah' },
      { src: r2('avu+hannah/avu.mp4'), label: 'Avu' },
      { src: r2('avu-hannah/4.mp4'), label: '01' },
      { src: r2('avu-hannah/5.mp4'), label: '02' },
      { src: r2('avu-hannah/7.mp4'), label: '03' },
    ],
  },
  {
    title: 'Bella Beauty',
    slug: 'bella-beauty',
    date: '2025-05-23',
    // "Test" from info.txt kept, folded into the category as a beauty test.
    category: 'beauty test',
    roles: ['Director', 'Director of Photography', 'Colourist'],
    priority: 9,
    films: [{ src: r2('bella-beauty/2025_05_23_Bella_Final.mp4') }],
    credits: [{ role: 'Director', name: 'Pieter Steyn' }],
    keyStill: 2,
    archiveStill: 6,
  },
  {
    // Filed on R2 under "Grunge Stills". No film supplied — stills only.
    title: 'Grunge',
    slug: 'grunge',
    date: '2025-06-07',
    category: 'beauty',
    roles: ['Director of Photography', 'Colourist'],
    priority: 12,
    colourFeature: true,
    films: [],
    keyStill: 1,
    archiveStill: 3,
  },
  {
    title: 'Sarie Magazine x Chanel Beauty',
    slug: 'sarie-chanel',
    client: 'Sarie Magazine',
    date: '2024-10-18',
    // info.txt left Category blank; the title was marked "(Social)".
    category: 'socials',
    roles: ['Director of Photography', 'Colourist'],
    films: [{ src: r2('Sarie Magazine x Chanel Beauty/2024_10_18_Sarie_wip.mp4') }],
  },
  {
    title: 'Max',
    slug: 'max',
    date: '2024-07-25',
    category: 'fashion film',
    roles: ['Director of Photography', 'Colourist'],
    priority: 10,
    films: [{ src: r2('Max/2024_07_25_01_Max_Final_03_16x9.mp4') }],
    keyStill: 2,
    archiveStill: 5,
  },
  {
    title: 'Farm',
    slug: 'farm',
    date: '2024-01-01', // year confirmed; day is a placeholder for sorting
    category: 'fashion film',
    roles: ['Director of Photography', 'Colourist'],
    priority: 11,
    films: [{ src: r2('Farm.mp4') }],
    keyStill: 3,
    archiveStill: 1,
  },
  {
    title: 'Faith for Nataal Magazine',
    slug: 'faith',
    client: 'Nataal Magazine',
    date: '2022-03-29',
    category: 'editorial',
    roles: ['Director of Photography', 'Colourist'],
    colourFeature: true,
    films: [{ src: r2('Faith For Nataal Magazine/2022_03_29_FAITH_Final_NewMusic_Hires-PG’s MacBook Pro.mp4') }],
  },
  {
    title: 'Jemma for PAP Magazine',
    slug: 'jemma',
    client: 'PAP Magazine',
    date: '2022-01-11',
    category: 'editorial',
    roles: ['Colourist'],
    // info.txt's "Homey Magazine" production credit was a slip — confirmed,
    // so no production credit here.
    films: [{ src: r2('Jemma for Pap Magazine/2022_01_11_CLAUDINE_JEMMA_V1_INSTAGRAM-PG’s MacBook Pro.mp4') }],
  },
];

/** Pinned projects first (by priority), then everything else newest first. */
export const liveProjects = projects
  .filter((p) => !p.draft)
  .sort((a, b) => {
    if (a.priority && b.priority) return a.priority - b.priority;
    if (a.priority) return -1;
    if (b.priority) return 1;
    return b.date.localeCompare(a.date);
  });

export const yearOf = (p: Project) => p.date.slice(0, 4);

/**
 * Client, unless the title already says it — "Impermanence for Nataal Magazine"
 * should not print "Nataal Magazine" again beside it.
 */
export const clientOf = (p: Project) => {
  if (!p.client) return undefined;
  const t = p.title.toLowerCase();
  const c = p.client.toLowerCase();
  return t === c || t.includes(c) ? undefined : p.client;
};

/** Zero-padded catalogue number, assigned by position in the index. */
export const catalogueNumber = (index: number) => String(index + 1).padStart(3, '0');

/** "DOP / Colour" — the restrained short form used on the index. */
export function shortRoles(roles: Role[]): string {
  const map: Record<Role, string> = {
    Director: 'Dir',
    'Director of Photography': 'DOP',
    Colourist: 'Colour',
    Editor: 'Edit',
  };
  return roles.map((r) => map[r]).join(' / ');
}
