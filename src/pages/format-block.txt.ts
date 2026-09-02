import type { APIRoute } from 'astro';
import { liveProjects, catalogueNumber, shortRoles, yearOf, clientOf } from '../data/projects';
import { stillsFor, postersFor } from '../lib/stills';

/**
 * Generates the self-contained snippet for the existing Format site.
 *
 * Built from the SAME src/data/projects.ts as the standalone site, so the two
 * deliverables cannot drift. Run `npm run build`, then copy the contents of
 * dist/format-block.txt into a Format "Embed / Custom HTML" block.
 *
 * Assets: videos come from R2 as they already do; stills come from the
 * r2-upload/stills folder in this repo once it is uploaded to the same bucket.
 */

const R2 = 'https://pub-003bea79dbf24f299dc6fcfb58cf18ba.r2.dev/';

export const GET: APIRoute = () => {
  const data = liveProjects.map((p, i) => {
    const stillCount = stillsFor(p.slug).length;
    const posterCount = postersFor(p.slug).length;
    return {
      n: catalogueNumber(i),
      t: p.title,
      s: p.slug,
      c: clientOf(p) ?? '',
      y: yearOf(p),
      cat: p.category,
      r: shortRoles(p.roles),
      cf: p.colourFeature ? 1 : 0,

      k: p.keyStill ?? 1,
      a: p.archiveStill ?? p.keyStill ?? 1,
      // filenames are 01.jpg … NN.jpg by construction
      st: Array.from({ length: stillCount }, (_, j) => String(j + 1).padStart(2, '0') + '.jpg'),
      po: Array.from({ length: posterCount }, (_, j) => String(j + 1).padStart(2, '0') + '.jpg'),
      f: p.films.map((f) => ({ src: f.src, label: f.label ?? '' })),
    };
  });

  const block = `<!--
  Pieter Gabriël Steyn — index + project pages, for Format.
  Paste this whole block into a Format Embed / Custom HTML block on one page.

  BEFORE IT WILL WORK:
  upload the folder  r2-upload/stills/  to the root of the R2 bucket
  (pub-003bea79dbf24f299dc6fcfb58cf18ba) so the files sit at
  <bucket>/stills/<slug>/01.jpg etc.

  Project pages are addressed by hash: pietergsteyn.com/#/nadir
  Back button and refresh both work. For real /projects/nadir URLs,
  use the standalone Astro build instead.
-->
<div id="psg-root" data-psg>
<style>
#psg-root{
  --grotesk:"Helvetica Neue",Helvetica,Inter,Arial,sans-serif;
  --mono:ui-monospace,"SF Mono",SFMono-Regular,"Andale Mono",Menlo,monospace;
  --ink:#0d0d0d;--muted:#8c8c8c;--faint:#c4c4c4;--bg:#fbfbfa;--rule:#e6e6e4;
  --margin:1.5rem;--section:6rem;--dur:420ms;--ease:cubic-bezier(.22,.61,.36,1);
  background:var(--bg);color:var(--ink);font-family:var(--grotesk);font-size:14px;
  line-height:1.35;-webkit-font-smoothing:antialiased;
}
@media(min-width:48rem){#psg-root{--margin:2.5rem;--section:9rem}}
#psg-root *{box-sizing:border-box}
#psg-root img,#psg-root video{display:block;max-width:100%}
#psg-root a{color:inherit;text-decoration:none}
#psg-root h1,#psg-root h2,#psg-root p,#psg-root figure,#psg-root ol{margin:0;font-size:inherit;font-weight:400}
#psg-root ol{list-style:none;padding:0}
#psg-root .shell{padding-inline:var(--margin)}
#psg-root .marker{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
#psg-root .meta{font-family:var(--mono);font-size:11px;letter-spacing:.03em;color:var(--muted)}
#psg-root .title{font-size:15px;letter-spacing:-.006em}

#psg-root .mast{display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;padding-block:1.75rem 0}
#psg-root .ident{display:flex;flex-direction:column;gap:.2rem}
#psg-root .disc{color:var(--ink)}
#psg-root .nav{display:flex;gap:1.5rem;padding-top:.2rem}
#psg-root .nav a:hover{color:var(--ink)}

#psg-root .head{display:flex;justify-content:space-between;align-items:baseline;padding-bottom:.85rem;border-bottom:1px solid var(--rule)}
#psg-root .sect{margin-top:var(--section)}
#psg-root .row{border-bottom:1px solid var(--rule)}
#psg-root .link{display:grid;grid-template-columns:2.75rem minmax(0,1fr);
  grid-template-areas:"num name" ". facts" ". roles";row-gap:.3rem;align-items:baseline;
  padding-block:1rem;transition:opacity var(--dur) var(--ease)}
/* grid-area placement belongs ONLY to index rows — without this scoping it
   leaks into the project header, which is a plain grid, and scatters it. */
#psg-root .link .num{grid-area:num}
#psg-root .link .name{grid-area:name}
#psg-root .link .facts{grid-area:facts}
#psg-root .link .roles{grid-area:roles}
#psg-root .facts{display:flex;flex-wrap:wrap;gap:.5rem}
#psg-root .roles{display:inline-flex;align-items:center;gap:.45rem;color:var(--muted)}
#psg-root .facts>*+*::before{content:"/ ";color:var(--faint)}
#psg-root .dot{width:3px;height:3px;border-radius:50%;background:var(--ink);display:inline-block}
#psg-root .rowimg{display:block;padding-bottom:1rem}
#psg-root .panel{display:none}

@media(min-width:60rem){
  #psg-root .layout{display:grid;grid-template-columns:minmax(0,1fr) 38vw;gap:0 var(--section);align-items:start}
  #psg-root .link{grid-template-columns:2.75rem minmax(0,13rem) minmax(0,1fr) auto;
    grid-template-areas:"num name facts roles";column-gap:1.25rem;row-gap:0;padding-block:.12rem;line-height:2.5}
  #psg-root .roles{justify-content:flex-end}
  #psg-root .index:hover .link{opacity:.4}
  #psg-root .index .link:hover{opacity:1}
  #psg-root .rowimg{display:none}
  #psg-root .panel{display:block;position:sticky;top:var(--margin)}
  #psg-root .pin{position:relative;display:grid}
  #psg-root .plate{grid-area:1/1;margin:0;opacity:0;transition:opacity var(--dur) var(--ease)}
  #psg-root .plate.on{opacity:1}
  #psg-root .pcap{padding-top:.7rem}
}

/* Desktop only — on mobile the index rows already carry a still each. */
#psg-root .archsect{display:none}
#psg-root .arch{display:grid;gap:4rem;padding-top:2.5rem}
@media(min-width:60rem){
  #psg-root .archsect{display:block}
  #psg-root .arch{gap:5.5rem;padding-top:3.5rem}
  #psg-root .arch figure{width:58%}
  #psg-root .arch figure.r{margin-left:auto}
}
#psg-root .arch figure{margin:0}
#psg-root .arch figcaption{display:flex;gap:.6rem;padding-top:.7rem}
#psg-root .arch a{display:block;transition:opacity var(--dur) var(--ease)}
#psg-root .arch a:hover{opacity:.72}

#psg-root .phead{display:grid;gap:.3rem;padding-bottom:2.5rem}
#psg-root .media{display:grid;gap:var(--margin)}
@media(min-width:60rem){#psg-root .media{padding-inline:var(--margin)}}
#psg-root .frame{position:relative;background:#000}
#psg-root .frame video{width:100%;height:auto;display:none}
#psg-root .frame.play video{display:block}
#psg-root .frame.play .poster,#psg-root .frame.play .pbtn{display:none}
#psg-root .pbtn{position:absolute;inset:0;width:100%;border:0;padding:0;background:transparent;
  cursor:pointer;display:grid;place-items:end start;color:#fff;font:inherit}
#psg-root .pbtn span{margin:1rem 1.15rem;mix-blend-mode:difference;color:#fff}
#psg-root .pbtn:hover span{opacity:.6}

#psg-root .pager{margin-top:var(--section);padding-top:1rem;border-top:1px solid var(--rule);
  display:flex;justify-content:space-between;gap:1rem}
#psg-root .pager .sides{display:flex;gap:1.5rem}
#psg-root .foot{display:flex;flex-wrap:wrap;gap:.5rem 2rem;justify-content:space-between;
  padding-block:2.5rem 3rem;margin-top:var(--section);border-top:1px solid var(--rule)}
</style>

<header class="shell mast">
  <div class="ident">
    <a class="title" href="#/" id="psg-name">Pieter Gabriël Steyn</a>
    <p class="disc meta">Director of Photography &amp; Colourist</p>
  </div>
  <nav class="nav marker">
    <a href="#/">Index</a>
    <a href="#/information">Information</a>
  </nav>
</header>

<main id="psg-main"></main>

<footer class="shell foot">
  <p class="meta">Pieter Gabriël Steyn — Cape Town</p>
  <p class="meta"><a href="mailto:pietergsteyn@icloud.com">pietergsteyn@icloud.com</a> ·
  <a href="https://instagram.com/pietergsteyn" target="_blank" rel="noopener">Instagram</a></p>
</footer>

<script>
(function(){
  var R2 = ${JSON.stringify(R2)};
  var P  = ${JSON.stringify(data)};
  var main = document.getElementById('psg-main');
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function still(p, i){ return R2 + 'stills/' + p.s + '/' + p.st[i]; }
  function poster(p, i){ return R2 + 'posters/' + p.s + '/' + p.po[i]; }
  // Index image: real photography where it exists, else the first poster frame.
  function keyImg(p){ return p.st.length ? still(p, Math.min(p.k, p.st.length) - 1) : poster(p, 0); }
  function archImg(p){ return p.st.length ? still(p, Math.min(p.a, p.st.length) - 1) : poster(p, 0); }
  function hasImg(p){ return p.st.length || p.po.length; }

  function index(){
    var rows = P.map(function(p){
      var facts = [p.c, p.y, p.cat].filter(Boolean)
        .map(function(x){ return '<span>' + esc(x) + '</span>'; }).join('');
      var img = hasImg(p) ? '<a class="rowimg" href="#/' + p.s + '" aria-hidden="true" tabindex="-1">' +
        '<img loading="lazy" alt="" src="' + keyImg(p) + '"></a>' : '';
      return '<li class="row"><a class="link" href="#/' + p.s + '" data-slug="' + p.s + '">' +
        '<span class="num marker">' + p.n + '</span>' +
        '<span class="name title">' + esc(p.t) + '</span>' +
        '<span class="facts meta">' + facts + '</span>' +
        '<span class="roles meta">' + esc(p.r) + (p.cf ? '<span class="dot"></span>' : '') + '</span>' +
        '</a>' + img + '</li>';
    }).join('');

    var plates = P.filter(hasImg).map(function(p, i){
      return '<figure class="plate' + (i === 0 ? ' on' : '') + '" data-plate="' + p.s + '">' +
        '<img loading="' + (i === 0 ? 'eager' : 'lazy') + '" alt="" src="' + keyImg(p) + '"></figure>';
    }).join('');

    var arch = P.filter(hasImg).map(function(p, i){
      return '<figure class="' + (i % 2 ? 'r' : '') + '"><a href="#/' + p.s + '">' +
        '<img loading="lazy" alt="' + esc(p.t) + '" src="' + archImg(p) + '">' +
        '<figcaption class="meta"><span style="color:var(--ink)">' + esc(p.t) +
        '</span><span style="color:var(--faint)">' + p.y + '</span></figcaption></a></figure>';
    }).join('');

    main.innerHTML =
      '<section class="sect"><div class="shell head"><h2 class="marker">Selected work</h2>' +
      '<p class="marker">' + P.length + ' projects</p></div>' +
      '<div class="shell layout"><ol class="index">' + rows + '</ol>' +
      '<div class="panel"><div class="pin">' + plates + '</div>' +
      '<p class="pcap meta" id="psg-cap">' + esc(P[0].t) + '</p></div></div></section>' +
      '<section class="sect archsect"><div class="shell head"><h2 class="marker">Stills</h2></div>' +
      '<div class="shell arch">' + arch + '</div></section>';

    var idx = main.querySelector('.index'), cap = document.getElementById('psg-cap');
    if (idx) idx.addEventListener('pointerover', function(e){
      var a = e.target.closest('[data-slug]'); if (!a) return;
      var cur = main.querySelector('.plate.on'), nx = main.querySelector('[data-plate="' + a.dataset.slug + '"]');
      if (!nx || nx === cur) return;
      if (cur) cur.classList.remove('on');
      nx.classList.add('on');
      if (cap) cap.textContent = a.querySelector('.name').textContent;
    });
  }

  function project(p){
    var i = P.indexOf(p);
    var prev = P[(i - 1 + P.length) % P.length], next = P[(i + 1) % P.length];
    var facts = [p.c, p.y, p.cat].filter(Boolean)
      .map(function(x){ return '<span>' + esc(x) + '</span>'; }).join('');

    var films = p.f.map(function(f, j){
      // A poster is always a frame from its own film, so the aspect matches.
      var src = p.po[j] ? poster(p, j) : (hasImg(p) ? keyImg(p) : '');
      var img = src ? '<div class="poster"><img loading="' + (j ? 'lazy' : 'eager') +
        '" alt="" src="' + src + '"></div>' : '';
      return '<figure class="frame">' + img +
        '<video src="' + f.src + '" preload="none" playsinline controls></video>' +
        '<button class="pbtn" type="button"><span class="marker">Play' +
        (f.label ? ' — ' + esc(f.label) : '') + '</span></button></figure>';
    }).join('');

    var stills = p.st.map(function(s, j){
      return '<figure style="margin:0"><img loading="lazy" alt="' + esc(p.t) +
        ' — still ' + (j + 1) + '" src="' + R2 + 'stills/' + p.s + '/' + s + '"></figure>';
    }).join('');

    main.innerHTML =
      '<article class="sect"><header class="shell phead">' +
      '<p class="marker" style="color:var(--faint)">' + p.n + '</p>' +
      '<h1 class="title">' + esc(p.t) + '</h1>' +
      '<div class="facts meta">' + facts + '</div>' +
      '<p class="meta" style="color:var(--faint)">' + esc(p.r.replace(/DOP/, 'Director of Photography').replace(/Colour$/, 'Colourist')) + '</p>' +
      '</header>' +
      (films ? '<section class="media">' + films + '</section>' : '') +
      (stills ? '<section class="media" style="padding-top:var(--margin)">' + stills + '</section>' : '') +
      '<nav class="shell pager marker"><a href="#/">← Index</a><span class="sides">' +
      '<a href="#/' + prev.s + '">Prev</a><a href="#/' + next.s + '">Next</a></span></nav></article>';

    main.querySelectorAll('.frame').forEach(function(fr){
      fr.querySelector('.pbtn').addEventListener('click', function(){
        fr.classList.add('play');
        fr.querySelector('video').play().catch(function(){});
      });
    });
  }

  function info(){
    main.innerHTML =
      '<div class="shell sect" style="max-width:46rem;display:grid;gap:3.5rem">' +
      '<section><h2 class="marker">Practice</h2><div style="line-height:1.62;max-width:34rem;padding-top:.9rem">' +
      '<p>Pieter Gabriël Steyn is a Director of Photography and Colourist working across fashion, beauty, film and visual culture.</p>' +
      '<p style="margin-top:1rem">Shooting and grading are treated as a single continuous process rather than two separate jobs — the image is designed at capture and resolved in the grade.</p>' +
      '</div></section>' +
      '<section><h2 class="marker">Contact</h2><div class="meta" style="padding-top:.9rem;display:grid;gap:.35rem;color:var(--ink)">' +
      '<a href="mailto:pietergsteyn@icloud.com">pietergsteyn@icloud.com</a>' +
      '<a href="https://instagram.com/pietergsteyn" target="_blank" rel="noopener">@pietergsteyn</a>' +
      '<span>Cape Town, South Africa</span></div></section></div>';
  }

  function route(){
    var h = (location.hash || '#/').replace(/^#\\/?/, '');
    if (h === 'information') { info(); }
    else {
      var p = P.filter(function(x){ return x.s === h; })[0];
      if (p) project(p); else index();
    }
    if (main.scrollIntoView) window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', route);
  route();
})();
</script>
</div>
`;

  return new Response(block, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
