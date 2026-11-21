import { mkdir, readFile, writeFile } from 'node:fs/promises'

const siteUrl = 'https://jokebylemans.be'
const outputDir = new URL('../public/projecten/', import.meta.url)

// De projecten komen uit de CMS (via scripts/build-content.mjs -> src/generated/site-content.json).
const content = JSON.parse(await readFile(new URL('../src/generated/site-content.json', import.meta.url), 'utf-8'))
const abs = (path) => (path && /^https?:\/\//.test(path) ? path : path ? `${siteUrl}${path.startsWith('/') ? '' : '/'}${path}` : undefined)
const encodePath = (path) => (path ? encodeURI(path) : path)

const projects = content.projects
  .filter((project) => project.visible)
  .map((project) => {
    const isPdf = Boolean(project.previewLink && project.previewLink.toLowerCase().endsWith('.pdf'))
    return {
      slug: project.slug,
      title: project.title,
      category: project.category,
      role: project.role,
      description: project.seo?.description || project.summary,
      seoTitle: project.seo?.title,
      mediaUrl: encodePath(isPdf ? project.previewLink : project.videoPath),
      mediaType: isPdf ? 'pdf' : project.videoPath ? 'video' : undefined,
      image: project.image,
      youtubeId: project.youtubeId,
      uploadDate: project.youtubeUploadDate,
    }
  })

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
  <meta property="og:site_name" content="Joke Bylemans">
  <meta property="og:locale" content="nl_BE">
  <meta name="twitter:card" content="summary_large_image">
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
  const image = project.image ? abs(project.image) : project.youtubeId ? `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg` : `${siteUrl}/og-joke-bylemans.jpg`
  const videoMarkup = project.mediaType === 'pdf'
    ? `<p><a href="${project.mediaUrl}" target="_blank" rel="noopener noreferrer">Lees de blog (PDF)</a></p><a href="${project.mediaUrl}" target="_blank" rel="noopener noreferrer"><img src="${project.image}" alt="Eerste pagina van de blog" style="display:block;max-width:100%;max-height:700px" /></a>`
    : project.mediaType === 'video'
    ? `<video controls playsinline preload="metadata"${project.image ? ` poster="${project.image}"` : ''} src="${project.mediaUrl}" aria-label="${escapeHtml(project.title)}" style="display:block;width:100%;max-height:75vh;background:#111;border-radius:20px"></video>`
    : project.youtubeId
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

  const html = `<!doctype html><html lang="nl-BE"><head>${sharedHead(project.seoTitle ?? `${project.title} | Joke Bylemans`, project.description, canonical, image)}${videoJsonLd}</head><body><main><a class="back" href="/projecten/">← Alle projecten</a><article><p class="eyebrow">${escapeHtml(project.category)}</p><h1>${escapeHtml(project.title)}</h1><p class="lead">${escapeHtml(project.description)}</p><p class="role">Rol van Joke: ${escapeHtml(project.role)}</p>${videoMarkup}</article></main></body></html>`
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
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap)
