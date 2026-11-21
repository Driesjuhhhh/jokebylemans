import raw from '../generated/site-content.json'

// Alle content komt uit de Areca CMS (zie scripts/build-content.mjs).
export type ProjectCategory = 'Presentatie' | 'Voice-over' | 'Multicamera' | 'Content Creation'

export type SiteImage = { src: string; alt: string; focus?: string }

export type ProjectDetailData = {
  title: string
  tagline: string
  intro: string
  phases: { title: string; description: string }[]
  team: string[]
  context: string
  externalUrl: string
  externalLinkLabel: string
  images: SiteImage[]
}

export type ProjectData = {
  id: string
  slug: string
  title: string
  kind: string
  category: ProjectCategory
  summary: string
  role: string
  tags: string[]
  mediaType: 'video' | 'image' | 'gallery' | 'youtube' | 'youtube-short'
  image?: string
  mediaAlt: string
  videoPath?: string
  youtubeId?: string
  youtubeUploadDate?: string
  portrait: boolean
  link?: string
  linkLabel?: string
  previewLink?: string
  visible: boolean
  gallery: SiteImage[]
  detail?: ProjectDetailData
}

export type EducationData = {
  id: string
  period: string
  institution: string
  program: string
  description: string
  highlight: string
  imageSrc: string
  imageAlt: string
  imagePosition?: string
  hasMoreInfo: boolean
}

export type SiteInfo = {
  name: string
  heroWord: string
  tagline: string
  cvUrl: string
  instagramUrl: string
  instagramLabel: string
  linkedinUrl: string
  contactTitle: string
  contactText: string
  email: string
  footerCredit: string
  footerCreditUrl: string
}

export type WhoAmIData = { title: string; paragraphs: string[]; nextPhotoHint: string; photos: SiteImage[] }

export type RadioData = {
  title: string
  paragraphs: string[]
  image: string
  imageAlt: string
  programUrl: string
  scheduleLabel: string
  galleryTitle: string
  galleryText: string
  photos: SiteImage[]
}

const content = raw as unknown as {
  siteInfo: SiteInfo
  whoAmI: WhoAmIData
  radio: RadioData
  educationIntro: { title: string; moreInfoLabel: string }
  educations: EducationData[]
  projects: ProjectData[]
}

export const siteInfo = content.siteInfo
export const whoAmI = content.whoAmI
export const radio = content.radio
export const educationIntro = content.educationIntro
export const educations = content.educations
export const projects = content.projects.filter((project) => project.visible)
export const projectCategories: ProjectCategory[] = ['Presentatie', 'Voice-over', 'Multicamera', 'Content Creation']

/** Pad op de site (bv. /media/x.mp4) met de Vite base ervoor; volledige URL's blijven ongemoeid. */
export function withBase(path: string | undefined) {
  if (!path || /^(https?:)?\/\//.test(path)) return path ?? ''
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
