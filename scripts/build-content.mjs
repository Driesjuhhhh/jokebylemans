// Zet de door `areca pull` gedownloade CMS-content om naar één JSON die de Vue-app
// en generate-seo-pages.mjs gebruiken: src/generated/site-content.json
import { mkdir, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { readContent, readContentManifest, readGlobalsFile } from '@areca-cms/site-sdk/pull'

const contentDir = fileURLToPath(new URL('../src/generated/content', import.meta.url))
const outFile = new URL('../src/generated/site-content.json', import.meta.url)

const manifest = readContentManifest(contentDir)
const read = (key) => readContent(contentDir, key, manifest)
const globals = readGlobalsFile(contentDir, manifest)

const byOrder = (a, b) => (a.data.order ?? 0) - (b.data.order ?? 0)
const img = (value) => (value && value.url ? { src: value.url, alt: value.alt ?? '' } : undefined)
const list = (value) => (value ? String(value).split(',').map((item) => item.trim()).filter(Boolean) : [])
const unescapeMd = (text) => text.replace(/\\([\\`*_{}[\]()#+\-.!|<>~])/g, '$1')
const paragraphs = (rich) =>
  unescapeMd(rich?.markdown ?? '')
    .split(/\n{2,}/)
    .map((p) => p.replace(/\s*\n\s*/g, ' ').trim())
    .filter(Boolean)
const refId = (ref) => (typeof ref === 'string' ? ref : ref?.id)
const group = (entries, key) => {
  const map = new Map()
  for (const entry of entries) {
    const id = refId(entry.data.project)
    if (!id) continue
    if (!map.has(id)) map.set(id, [])
    map.get(id).push(entry)
  }
  for (const items of map.values()) items.sort(byOrder)
  return map
}

const projectImages = group(read('projectImages'), 'project')
const projectPhases = group(read('projectPhases'), 'project')

const projects = read('projects')
  .sort(byOrder)
  .map((entry) => {
    const d = entry.data
    const images = projectImages.get(entry.id) ?? []
    const gallery = images.filter((i) => i.data.usage === 'gallery').map((i) => img({ ...i.data.image, alt: i.data.alt }))
    const detailImages = images.filter((i) => i.data.usage === 'detail').map((i) => img({ ...i.data.image, alt: i.data.alt }))
    const phases = (projectPhases.get(entry.id) ?? []).map((p) => ({ title: p.data.title, description: p.data.description }))
    const poster = img(d.image)
    return {
      id: entry.id,
      slug: entry.slug,
      title: d.title,
      kind: d.kind ?? '',
      category: d.category,
      summary: d.summary,
      role: d.role,
      tags: list(d.tags),
      mediaType: d.mediaType,
      image: poster?.src,
      mediaAlt: d.mediaAlt || poster?.alt || d.title,
      videoPath: d.videoPath || undefined,
      youtubeId: d.youtubeId || undefined,
      youtubeUploadDate: d.youtubeUploadDate || undefined,
      portrait: Boolean(d.portrait),
      link: d.link || undefined,
      linkLabel: d.linkLabel || undefined,
      previewLink: d.previewLink || undefined,
      visible: d.visible !== false,
      gallery,
      seo: entry.seo ? { title: entry.seo.title, description: entry.seo.description } : undefined,
      detail: d.hasDetail
        ? {
            title: d.title,
            tagline: d.detailTagline ?? '',
            intro: d.detailIntro ?? '',
            phases,
            team: list(d.detailTeam),
            context: d.detailContext ?? '',
            externalUrl: d.detailExternalUrl ?? '',
            externalLinkLabel: d.detailExternalLinkLabel ?? '',
            images: detailImages,
          }
        : undefined,
    }
  })

const educations = read('educations')
  .sort(byOrder)
  .map((entry) => ({
    id: entry.id,
    period: entry.data.period,
    institution: entry.data.institution,
    program: entry.data.program,
    description: entry.data.description,
    highlight: entry.data.highlight ?? '',
    imageSrc: img(entry.data.image)?.src ?? '',
    imageAlt: entry.data.imageAlt || entry.data.image?.alt || '',
    imagePosition: entry.data.imagePosition || undefined,
    hasMoreInfo: Boolean(entry.data.hasMoreInfo),
  }))

const photos = read('photos').sort(byOrder)
const photosFor = (section) =>
  photos
    .filter((p) => p.data.section === section)
    .map((p) => ({ src: p.data.image.url, alt: p.data.alt, focus: p.data.focus || undefined }))

const g = (key) => globals[key]?.data ?? {}
const siteInfoGlobal = globals.siteInfo

// Oudere publicaties hebben deze collectie nog niet: dan valt de site terug op het standaardmenu.
const readOptional = (key) => {
  try {
    return read(key)
  } catch {
    return []
  }
}

const menuItems = readOptional('menuItems')
  .sort(byOrder)
  .map((entry) => ({
    id: entry.id,
    title: entry.data.title,
    style: entry.data.style ?? 'Tekst',
    target: entry.data.target,
    icon: entry.data.icon || undefined,
    position: entry.data.position ?? 'Midden',
    order: entry.data.order ?? 0,
    visible: entry.data.visible !== false,
    newTab: Boolean(entry.data.newTab),
    hideOnMobile: Boolean(entry.data.hideOnMobile),
  }))

const headerData = g('header')

const content = {
  siteInfo: { ...g('siteInfo'), seo: siteInfoGlobal?.seo },
  whoAmI: { title: g('whoAmI').title, paragraphs: paragraphs(g('whoAmI').body), nextPhotoHint: g('whoAmI').nextPhotoHint, photos: photosFor('wie-ben-ik') },
  radio: {
    title: g('radio').title,
    paragraphs: paragraphs(g('radio').body),
    image: img(g('radio').image)?.src,
    imageAlt: g('radio').imageAlt,
    programUrl: g('radio').programUrl,
    scheduleLabel: g('radio').scheduleLabel,
    galleryTitle: g('radio').galleryTitle,
    galleryText: g('radio').galleryText,
    photos: photosFor('radio'),
  },
  educationIntro: g('educationIntro'),
  uiTexts: g('uiTexts'),
  menuItems,
  header: { ...headerData, logoImage: img(headerData.logoImage) },
  educations,
  projects,
}

await mkdir(new URL('./', outFile), { recursive: true })
await writeFile(outFile, `${JSON.stringify(content, null, 2)}\n`)
console.log(`site-content.json: ${projects.length} projecten, ${educations.length} opleidingen`)
