import { mkdir, writeFile } from 'node:fs/promises'

const siteUrl = 'https://jokebylemans.be'
const outputDir = new URL('../public/projecten/', import.meta.url)
const lastModified = new Date().toISOString().slice(0, 10)

const projects = [
  {
    slug: 'de-keizerspinguin',
    title: 'De Keizerspinguin',
    category: 'Voice-over',
    role: 'Voice-over',
    description: 'Een korte documentaire die Joke Bylemans insprak tijdens een workshop van Chris Dusauchoit.',
  },
  {
    slug: 'de-wijers',
    title: 'De Wijers',
    category: 'Voice-over',
    role: 'Voice-over in samenwerking met De Praeters',
    description: 'Een natuurvideo over het ontstaan van De Wijers, ingesproken tijdens Joke haar stage bij Regionaal Landschap Lage Kempen.',
  },
  {
    slug: 'lily-de-libel',
    title: 'Lily De Libel',
    category: 'Voice-over',
    role: 'Stem van Lily de libel',
    description: 'Een natuurwandeling op kinderformaat voor Tessenderlo-Ham, verteld door het personage Lily de libel.',
  },
  {
    slug: '40-jaar-tsjernobyl',
    title: '40 Jaar Tsjernobyl',
    category: 'Presentatie en multicamera',
    role: 'Presentatrice',
    description: 'Een studiogesprek waarin Joke Bylemans met experten terugblikt op de kernramp van Tsjernobyl en de situatie vandaag.',
    youtubeId: '5IJnxNpA8LE',
    uploadDate: '2026-06-18T14:08:09-07:00',
  },
  {
    slug: 'de-reconstructie',
    title: 'De Reconstructie',
    category: 'Multicamera',
    role: 'Regisseur',
    description: 'Een bekroond studio-misdaadprogramma en bachelorproef waarin kandidaat-speurders een misdaad reconstrueren.',
    youtubeId: 'nw-miMTtIoU',
    uploadDate: '2026-06-18T14:00:43-07:00',
  },
  {
    slug: 'efp-nieuwsbericht',
    title: 'EFP – Nieuwsbericht',
    category: 'Presentatie en multicamera',
    role: 'Productie, scenario en shotlist',
    description: 'Een fictief nieuwsbericht voor een spelshow, met productie, scenario en shotlist door het team van Joke.',
    youtubeId: 'NlrsdHlkavk',
    uploadDate: '2026-06-18T14:28:43-07:00',
  },
  {
    slug: 'battle-of-the-beats',
    title: 'Battle of the Beats',
    category: 'Multicamera',
    role: 'Regisseur',
    description: 'Een studio-muziekquiz waarin vier generaties hun muzikale kennis testen, geregisseerd door Joke Bylemans.',
    youtubeId: 'XBqfetEI5As',
    uploadDate: '2026-06-24T11:32:15-07:00',
  },
  {
    slug: 'la-travel-vlog',
    title: 'LA Travel Vlog',
    category: 'Content creation',
    role: 'Opname en montage',
    description: 'Een travelvlog uit Los Angeles waarvoor Joke zelf de beelden en de volledige montage verzorgde.',
    youtubeId: '75XDGQ8reys',
    uploadDate: '2026-09-03T13:14:05-07:00',
  },
  {
    slug: 'porto-travel-vlog',
    title: 'Porto Travel Vlog',
    category: 'Content creation',
    role: 'Opname en montage',
    description: 'Een travelvlog uit Porto waarvoor Joke zelf de beelden en de volledige montage verzorgde.',
    youtubeId: 'MIVGPq4eXsY',
    uploadDate: '2026-09-03T13:17:24-07:00',
  },
  {
    slug: 'lissabon-travel-vlog',
    title: 'Lissabon Travel Vlog',
    category: 'Content creation',
    role: 'Opname en montage',
    description: 'Een travelvlog uit Lissabon waarvoor Joke zelf de beelden en de volledige montage verzorgde.',
    youtubeId: '1WKM004EfDM',
    uploadDate: '2026-09-03T13:19:29-07:00',
  },
  {
    slug: 'wandelroute-kasteel-meylandt',
    title: 'Wandelroute in de kijker: Kasteel Meylandt',
    category: 'Content creation',
    role: 'Opname, montage en social media',
    description: 'Een stagevideo die de wandelroute bij Kasteel Meylandt in De Wijers in de kijker zet.',
    youtubeId: 'u-kUjV-_Gvo',
    uploadDate: '2026-09-03T13:23:38-07:00',
  },
  {
    slug: 'wandelroute-kelchterhoef',
    title: 'Wandelroute in de kijker: Kelchterhoef',
    category: 'Content creation',
    role: 'Opname, montage en social media',
    description: 'Een stagevideo die de wandelroute in Kelchterhoef in De Wijers in de kijker zet.',
    youtubeId: '94oh3a0RAQE',
    uploadDate: '2026-09-03T13:28:32-07:00',
  },
  {
    slug: 'wandelroute-de-wijers',
    title: 'Wandelroute in de kijker',
    category: 'Content creation',
    role: 'Opname, montage en social media',
    description: 'Een stagevideo waarin Joke een wandelroute in De Wijers filmt, monteert en publiceert op sociale media.',
    youtubeId: 'Zt3qLUpgYpI',
    uploadDate: '2026-09-03T13:27:09-07:00',
  },
]

const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

const sharedHead = (title, description, canonical, image) => `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${image}">
  <style>
    :root{font-family:Arial,sans-serif;color:#c80f12;background:#f1dfd2}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 8% 8%,#f7ebdf,#f1dfd2 42%,#ebd3c4)}main{width:min(920px,calc(100% - 32px));margin:auto;padding:48px 0 72px}a{color:inherit}.back{display:inline-block;margin-bottom:32px}.eyebrow{text-transform:uppercase;letter-spacing:.12em;font-size:.78rem;font-weight:700}h1{font-size:clamp(2.4rem,8vw,5.4rem);line-height:.95;text-transform:uppercase;margin:.4rem 0 1rem}.lead{font-size:clamp(1.05rem,2.5vw,1.35rem);line-height:1.55;max-width:65ch}.role{font-weight:700}.video{margin-top:30px;aspect-ratio:16/9;width:100%;border:1px solid #c80f1240;border-radius:20px;overflow:hidden;background:#111}.video iframe{width:100%;height:100%;border:0}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px}.card{display:block;padding:20px;border:1px solid #c80f1240;border-radius:18px;background:#fff8;text-decoration:none}.card span{display:block;margin-top:8px;font-size:.85rem;opacity:.75}
  </style>`

await mkdir(outputDir, { recursive: true })

for (const project of projects) {
  const canonical = `${siteUrl}/projecten/${project.slug}/`
  const image = project.youtubeId ? `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg` : `${siteUrl}/og-joke-bylemans.jpg`
  const videoMarkup = project.youtubeId
    ? `<div class="video"><iframe src="https://www.youtube.com/embed/${project.youtubeId}?rel=0&cc_load_policy=0" title="${escapeHtml(project.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`
    : `<p><a href="${siteUrl}/#projecten">Bekijk en beluister dit project in het portfolio.</a></p>`
  const videoJsonLd = project.youtubeId
    ? `<script type="application/ld+json">${JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: project.title,
        description: project.description,
        thumbnailUrl: image,
        uploadDate: project.uploadDate,
        embedUrl: `https://www.youtube.com/embed/${project.youtubeId}`,
      }).replaceAll('<', '\\u003c')}</script>`
    : ''

  const html = `<!doctype html><html lang="nl-BE"><head>${sharedHead(`${project.title} | Joke Bylemans`, project.description, canonical, image)}${videoJsonLd}</head><body><main><a class="back" href="/projecten/">← Alle projecten</a><article><p class="eyebrow">${escapeHtml(project.category)}</p><h1>${escapeHtml(project.title)}</h1><p class="lead">${escapeHtml(project.description)}</p><p class="role">Rol van Joke: ${escapeHtml(project.role)}</p>${videoMarkup}</article></main></body></html>`
  const projectDir = new URL(`./${project.slug}/`, outputDir)
  await mkdir(projectDir, { recursive: true })
  await writeFile(new URL('./index.html', projectDir), html)
}

const projectCards = projects.map((project) => `<a class="card" href="/projecten/${project.slug}/"><strong>${escapeHtml(project.title)}</strong><span>${escapeHtml(project.category)} · ${escapeHtml(project.role)}</span></a>`).join('')
const indexCanonical = `${siteUrl}/projecten/`
const indexDescription = 'Bekijk de presentatie-, voice-over-, multicamera- en contentcreationprojecten van Joke Bylemans.'
const indexHtml = `<!doctype html><html lang="nl-BE"><head>${sharedHead('Projecten | Joke Bylemans', indexDescription, indexCanonical, `${siteUrl}/og-joke-bylemans.jpg`)}</head><body><main><a class="back" href="/">← Portfolio</a><h1>Projecten van Joke Bylemans</h1><p class="lead">Presentatie, voice-over, multicamera, content creation en radio.</p><div class="grid">${projectCards}</div></main></body></html>`
await writeFile(new URL('./index.html', outputDir), indexHtml)

const sitemapUrls = [
  `${siteUrl}/`,
  `${siteUrl}/projecten/`,
  ...projects.map((project) => `${siteUrl}/projecten/${project.slug}/`),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod></url>`).join('\n')}\n</urlset>\n`
await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap)
