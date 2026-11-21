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

/** Vaste teksten van de site (menu, knoppen, schermlezer). Bewerkbaar in de CMS onder "Menu en teksten"; deze waarden zijn de terugval. */
const uiDefaults = {
  cvLabel: "CV",
  linkedinLabel: "LinkedIn",
  scrollLabel: "Scroll",
  scrollAria: "Scroll naar Wie ben ik",
  whoNextPhotoAria: "Volgende foto",
  projectsTitle: "Projecten",
  projectsLoading: "Media wordt geladen zodra de projecten in beeld komen",
  blogOpenAria: "Open de blog op groot formaat (PDF, nieuw tabblad)",
  enlargeHint: "Klik om te vergroten ↗",
  prevPhotoAria: "Vorige foto",
  nextPhotoAria: "Volgende foto",
  choosePhotoAria: "Foto kiezen",
  goToPhotoAria: "Ga naar foto {n}",
  unmuteHint: "Klik om te unmuten",
  muteLabel: "Mute",
  volumeAria: "Volume",
  roleLabel: "Rol:",
  watchEpisodeLabel: "Bekijk volledige aflevering",
  moreInfoLabel: "Meer info",
  prevLabel: "Vorige",
  nextLabel: "Volgende",
  projectListTitle: "Projectlijst",
  filterAria: "Filter projecten op categorie",
  pagerAria: "Projectpagina's",
  projectsWord: "projecten",
  choosePageAria: "Pagina kiezen",
  goToPageAria: "Ga naar projectpagina {n}",
  closeLabel: "Sluiten ✕",
  episodeFrameTitle: "Volledige aflevering",
  detailAria: "Projectinformatie",
  detailProgramTitle: "Hoe verloopt het programma?",
  detailMadeBy: "Gemaakt door",
  detailContext: "Context",
  radioWidgetTitle: "Radio Mol",
  radioWidgetClose: "Sluiten",
  tuneinTitle: "TuneIn player Radio Mol",
  liveNowLabel: "Live now",
  listenNowLabel: "Luister nu op deze pagina",
  programPageLabel: "Programmapagina",
  nowPlayingAlt: "Now Playing kaart van Blokke Met Jokke",
  radioInstagramAria: "Instagram van Blokke Met Jokke",
  radioInstagramLabel: "Instagram",
  footerPrefix: "Developed by",
}

export type MenuPosition = 'Links' | 'Midden' | 'Rechts'

export type MenuItem = {
  id: string
  title: string
  style: 'Tekst' | 'Knop' | 'Icoon'
  target: string
  icon?: 'Instagram' | 'LinkedIn' | 'E-mail' | 'Link'
  position: MenuPosition
  order: number
  visible: boolean
  newTab: boolean
  hideOnMobile: boolean
}

export type HeaderConfig = {
  logoText: string
  mobileLogoText: string
  logoImage?: SiteImage
  logoImageAlt: string
  logoHref: string
  logoPosition: MenuPosition
}

/** Terugval als de CMS (nog) geen menu levert: het oorspronkelijke menu. */
const defaultMenu: MenuItem[] = [
  { id: 'wie-ben-ik', title: 'Wie ben ik', style: 'Tekst', target: '#wie-ben-ik', position: 'Midden', order: 1, visible: true, newTab: false, hideOnMobile: false },
  { id: 'opleiding', title: 'Opleiding', style: 'Tekst', target: '#opleiding', position: 'Midden', order: 2, visible: true, newTab: false, hideOnMobile: false },
  { id: 'projecten', title: 'Projecten', style: 'Tekst', target: '#projecten', position: 'Midden', order: 3, visible: true, newTab: false, hideOnMobile: false },
  { id: 'radio', title: 'Radio', style: 'Tekst', target: '#radio-mol', position: 'Midden', order: 4, visible: true, newTab: false, hideOnMobile: false },
  { id: 'contact', title: 'Contact', style: 'Tekst', target: '#contact', position: 'Midden', order: 5, visible: true, newTab: false, hideOnMobile: false },
  { id: 'instagram', title: 'Instagram', style: 'Icoon', icon: 'Instagram', target: 'https://www.instagram.com/blokkemetjokke/', position: 'Rechts', order: 1, visible: true, newTab: true, hideOnMobile: true },
  { id: 'linkedin', title: 'LinkedIn', style: 'Icoon', icon: 'LinkedIn', target: 'https://www.linkedin.com/in/joke-bylemans-04088025b/', position: 'Rechts', order: 2, visible: true, newTab: true, hideOnMobile: true },
]

export type UiTexts = Record<keyof typeof uiDefaults, string>

const content = raw as unknown as {
  uiTexts?: Partial<UiTexts>
  menuItems?: MenuItem[]
  header?: Partial<HeaderConfig>
  siteInfo: SiteInfo
  whoAmI: WhoAmIData
  radio: RadioData
  educationIntro: { title: string; moreInfoLabel: string }
  educations: EducationData[]
  projects: ProjectData[]
}

export const ui: UiTexts = {
  ...uiDefaults,
  ...Object.fromEntries(
    Object.entries(content.uiTexts ?? {}).filter(([, value]) => typeof value === 'string' && value.trim() !== ''),
  ),
}

/** Vervangt {n} in een CMS-tekst door een nummer. */
export function fmt(template: string, n: number | string) {
  return template.replace('{n}', String(n))
}

const menuFromCms = (content.menuItems ?? []).filter((item) => item.visible && item.title && item.target)
export const menuItems: MenuItem[] = (menuFromCms.length ? menuFromCms : defaultMenu).slice().sort((a, b) => a.order - b.order)

const headerCms = content.header ?? {}
export const header: HeaderConfig = {
  logoText: headerCms.logoText || content.siteInfo.name,
  mobileLogoText: headerCms.mobileLogoText || (headerCms.logoText || content.siteInfo.name).split(' ')[0],
  logoImage: headerCms.logoImage,
  logoImageAlt: headerCms.logoImageAlt || content.siteInfo.name,
  logoHref: headerCms.logoHref || '#hero',
  logoPosition: headerCms.logoPosition || 'Links',
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
