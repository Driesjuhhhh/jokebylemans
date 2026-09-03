<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SlideSection from './SlideSection.vue'
import YoutubePlayer from '../ui/YoutubePlayer.vue'
import ProjectDetailModal, { type ProjectDetail } from '../ui/ProjectDetailModal.vue'
import { projectFilters, type ProjectCategory } from '../../state/projectFilter'

import keizersPinguing from '../../assets/pinguing-optimized.mp4'
import deWijers from '../../assets/Hoe is het landschap in De Wijers ontstaan.mp4'
import lily from '../../assets/lilly.mp4'
import tsjernobyl from '../../assets/Tsjerno.webp'
import deReconstructieTrailer from '../../assets/batac-de-reconstructie-trailer-optimized.mp4'
import reconstructieRegie from '../../assets/reconstructie-regie.webp'
import reconstructieCast from '../../assets/reconstructie-cast.webp'
import reconstructieStudio from '../../assets/reconstructie-studio.webp'
import reconstructieTeam from '../../assets/reconstructie-team.webp'
import reconstructieInterview from '../../assets/reconstructie-interview.webp'
import reconstructiePauze from '../../assets/reconstructie-pauze.webp'
import reconstructieRegie2 from '../../assets/reconstructie-regie2.webp'
import pukkelpopLivecamera from '../../assets/pukkelpop-livecamera.webp'
import pukkelpopStage from '../../assets/pukkelpop-stage.webp'
import pukkelpopRegie from '../../assets/pukkelpop-regie.webp'
import pukkelpopSfeer from '../../assets/pukkelpop-sfeer.webp'

type ProjectImage = {
  src: string
  alt: string
}

type ProjectItem = {
  title: string
  kind: string
  summary: string
  role: string
  mediaSrc: string
  mediaAlt: string
  mediaType: 'video' | 'image' | 'gallery' | 'youtube' | 'youtube-short'
  gallery?: ProjectImage[]
  youtubeId?: string
  categories: ProjectCategory[]
  tags: string[]
  link?: string
  linkLabel?: string
  detail?: ProjectDetail
}

const projects: ProjectItem[] = [
  {
    title: 'De Keizerspinguin',
    kind: 'Korte Documentaire',
    summary:
      'Bij Chris Dusauchoit leerden we een korte documentaire inspreken. Ik merkte meteen hoe leuk ik dat vond. Thuis oefende ik uren en daaruit kwam dit resultaat.',
    role: 'Voice-over',
    mediaSrc: keizersPinguing,
    mediaAlt: 'Still uit De Keizerspinguin',
    mediaType: 'video',
    categories: ['Voice-over'],
    tags: ['Documentaire', 'Stemwerk', 'Audio'],
    link: keizersPinguing,
    linkLabel: 'Bekijk fragment',
  },
  {
    title: 'De Wijers',
    kind: 'Natuur Voice-over',
    summary:
      'Deze passie trok ik door in mijn stage bij Regionaal Landschap Lage Kempen. In samenwerking met podcastbedrijf De Praeters sprak ik een voice-over in voor het natuurgebied De Wijers.',
    role: 'Voice-over in samenwerking met De Praeters',
    mediaSrc: deWijers,
    mediaAlt: 'Still uit De Wijers',
    mediaType: 'video',
    categories: ['Voice-over'],
    tags: ['Natuur', 'Stage', 'Voice-over'],
    link: deWijers,
    linkLabel: 'Bekijk fragment',
  },
  {
    title: 'Lily De Libel',
    kind: 'Kinderwandeling',
    summary:
      'In de gemeente Tessenderlo-Ham wilden ze een natuurwandeling op kinderformaat, geleid door Lily de libel. Ook hiervan mocht ik de stem inspreken.',
    role: 'Stem van Lily de libel',
    mediaSrc: lily,
    mediaAlt: 'Still uit Lily De Libel',
    mediaType: 'video',
    categories: ['Voice-over'],
    tags: ['Kinderen', 'Natuur', 'Stemacteren'],
    link: lily,
    linkLabel: 'Bekijk fragment',
  },
  {
    title: '40 Jaar Tsjernobyl',
    kind: 'Talkshow',
    summary:
      'En ook al sta ik meestal achter de camera, mocht ik tijdens deze talkshow voor de camera plaatsnemen.',
    role: 'Presentatrice',
    mediaSrc: tsjernobyl,
    mediaAlt: 'Still van de talkshow 40 Jaar Tsjernobyl',
    mediaType: 'image',
    categories: ['Presentatie', 'Multicamera'],
    tags: ['Talkshow', 'Studio', 'Presentatie'],
    youtubeId: '5IJnxNpA8LE',
  },
  {
    title: 'De Reconstructie',
    kind: 'Studio Misdaadprogramma',
    summary:
      'Samen met Martha Amougou en Zihna Van Genechten maakte ik De Reconstructie: een studioprogramma als opdracht voor onze bachelorproef. In dit spelprogramma gaan twee kandidaat-speurders op zoek naar bewijsmaterialen op de plaats delict. Aan de hand van die bewijzen proberen ze samen als duo de reconstructie van de misdaad te vormen.',
    role: 'Regisseur',
    mediaSrc: deReconstructieTrailer,
    mediaAlt: 'Still uit de trailer van De Reconstructie',
    mediaType: 'video',
    categories: ['Multicamera'],
    tags: ['BATAC', 'Studio', 'Misdaadprogramma'],
    youtubeId: 'nw-miMTtIoU',
    detail: {
      title: 'De Reconstructie',
      tagline: 'Studio misdaadprogramma · Bachelorproef BATAC',
      intro:
        'Een meeslepend misdaadprogramma waarin een duo van kandidaat-speurders de rol van echte rechercheurs op zich neemt. Aan de hand van bewijsmateriaal proberen ze een intrigerende zaak helemaal te ontrafelen.',
      phases: [
        {
          title: 'Plaats delict',
          description: 'De kandidaten bezoeken de plaats delict en speuren er naar bewijsmateriaal.',
        },
        {
          title: 'Expertise',
          description: 'Een forensisch expert geeft extra inzichten en duiding bij de verzamelde bewijsstukken.',
        },
        {
          title: 'Reconstructie',
          description: 'In de finale leggen de kandidaten alle puzzelstukken samen en presenteren ze hun reconstructie van de feiten.',
        },
      ],
      team: ['Joke Bylemans', 'Martha Amougou', 'Zihna Van Genechten'],
      context:
        'De Reconstructie is de bachelorproef van Joke, Martha en Zihna binnen de opleiding BATAC (Bachelor na Bachelor in Applied Audiovisual Communication) aan Thomas More Hogeschool in Mechelen, afgerond in 2026. Het programma won de prijs voor beste BATAC Multicamera-programma van dat jaar.',
      externalUrl: 'https://new.express.adobe.com/webpage/ONtBSCpZd3wUE',
      externalLinkLabel: 'Bekijk de volledige projectpagina',
      images: [
        { src: reconstructieRegie, alt: 'Regie in de controlekamer tijdens De Reconstructie' },
        { src: reconstructieCast, alt: 'De kandidaten van De Reconstructie op de set' },
        { src: reconstructieStudio, alt: 'De studio-opstelling van De Reconstructie' },
        { src: reconstructieTeam, alt: 'Het volledige team achter De Reconstructie' },
        { src: reconstructieInterview, alt: 'Opname achter de schermen bij De Reconstructie' },
        { src: reconstructiePauze, alt: 'Een pauzemoment tijdens de opnames van De Reconstructie' },
        { src: reconstructieRegie2, alt: 'De regie volgt de camerabeelden tijdens De Reconstructie' },
      ],
    },
  },
  {
    title: 'EFP - Nieuwsbericht',
    kind: 'Fictief Nieuwsbericht',
    summary:
      'Dit nieuwsbericht maakten we als EFP tijdens een spelshow. Het is dus een fictief verhaal, waarbij we de productie, het scenario en shotlist verzorgden.',
    role: 'Productie, scenario & shotlist',
    mediaSrc: '',
    mediaAlt: 'Still uit het EFP-nieuwsbericht',
    mediaType: 'youtube',
    categories: ['Presentatie', 'Multicamera'],
    tags: ['EFP', 'Nieuwsbericht', 'Spelshow'],
    link: 'https://youtu.be/NlrsdHlkavk',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'NlrsdHlkavk',
  },
  {
    title: 'Battle of the Beats',
    kind: 'Studio Muziekquiz',
    summary:
      'Bij Battle of the Beats nemen vier kandidaten uit verschillende generaties het tegen elkaar op met hun muzikale kennis. Als onderdeel van mijn opleiding BATAC aan Thomas More nam ik de regie van dit studioprogramma op me.',
    role: 'Regisseur',
    mediaSrc: '',
    mediaAlt: 'Still uit Battle of the Beats',
    mediaType: 'youtube',
    categories: ['Multicamera'],
    tags: ['BATAC', 'Studio', 'Muziekquiz'],
    link: 'https://youtu.be/XBqfetEI5As',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'XBqfetEI5As',
  },
  {
    title: 'Pukkelpop',
    kind: 'Festival Livestream',
    summary:
      'Op Pukkelpop 2026 werkte ik op vrijwillige basis als cameraoperator. Zo was mijn beeld af en toe te zien in de multicameralivestream die via VRT MAX werd uitgezonden. Bovendien mocht ik in de Boiler Room werken met een gimbal en een handycam, en bediende ik er een aantal PTZ-camera’s.',
    role: 'Livecameraoperator',
    mediaSrc: pukkelpopLivecamera,
    mediaAlt: 'Joke met een livecamera achter de schermen op Pukkelpop',
    mediaType: 'gallery',
    gallery: [
      { src: pukkelpopLivecamera, alt: 'Joke met een livecamera achter de schermen op Pukkelpop' },
      { src: pukkelpopStage, alt: 'Livecamera aan het podium van Pukkelpop tijdens Captain Comedy All Stars' },
      { src: pukkelpopRegie, alt: 'Multicameraregie van de livestream op Pukkelpop' },
      { src: pukkelpopSfeer, alt: 'Joke en een collega bij de Pukkelpop-fotowand' },
    ],
    categories: ['Multicamera'],
    tags: ['Pukkelpop', 'VRT MAX', 'Livestream'],
  },
  {
    title: 'LA Travel Vlog',
    kind: 'Travelvlog',
    summary:
      'Voor deze travelvlog uit Los Angeles stond ik zelf in voor zowel de opnames als de volledige montage.',
    role: 'Opname & montage',
    mediaSrc: '',
    mediaAlt: 'Still uit de LA Travel Vlog',
    mediaType: 'youtube',
    categories: ['Content Creation'],
    tags: ['Travel', 'Opname', 'Montage'],
    link: 'https://youtu.be/75XDGQ8reys',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: '75XDGQ8reys',
  },
  {
    title: 'Porto Travel Vlog',
    kind: 'Travelvlog',
    summary:
      'Voor deze travelvlog uit Porto stond ik zelf in voor zowel de beelden als de volledige montage.',
    role: 'Opname & montage',
    mediaSrc: '',
    mediaAlt: 'Still uit de Porto Travel Vlog',
    mediaType: 'youtube',
    categories: ['Content Creation'],
    tags: ['Travel', 'Opname', 'Montage'],
    link: 'https://youtu.be/MIVGPq4eXsY',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'MIVGPq4eXsY',
  },
  {
    title: 'Lissabon Travel Vlog',
    kind: 'Travelvlog',
    summary:
      'Voor deze travelvlog uit Lissabon stond ik zelf in voor zowel de beelden als de volledige montage.',
    role: 'Opname & montage',
    mediaSrc: '',
    mediaAlt: 'Still uit de Lissabon Travel Vlog',
    mediaType: 'youtube',
    categories: ['Content Creation'],
    tags: ['Travel', 'Opname', 'Montage'],
    link: 'https://youtu.be/1WKM004EfDM',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: '1WKM004EfDM',
  },
  {
    title: 'Wandelroute in de kijker: Kasteel Meylandt',
    kind: 'Socialmediavideo',
    summary:
      'Tijdens mijn stage kreeg ik de opdracht om verschillende wandelroutes in De Wijers in de kijker te zetten. Voor deze video over Kasteel Meylandt verzorgde ik zelf de opnames, de volledige montage en de publicatie op sociale media.',
    role: 'Opname, montage & social media',
    mediaSrc: '',
    mediaAlt: 'Still uit de video over de wandelroute bij Kasteel Meylandt',
    mediaType: 'youtube-short',
    categories: ['Content Creation'],
    tags: ['De Wijers', 'Stage', 'Social Media'],
    link: 'https://youtube.com/shorts/u-kUjV-_Gvo?feature=share',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'u-kUjV-_Gvo',
  },
  {
    title: 'Wandelroute in de kijker: Kelchterhoef',
    kind: 'Socialmediavideo',
    summary:
      'Tijdens mijn stage zette ik ook de wandelroute in Kelchterhoef in de kijker. Ik verzorgde zelf de opnames, de volledige montage en de publicatie op sociale media.',
    role: 'Opname, montage & social media',
    mediaSrc: '',
    mediaAlt: 'Still uit de video over de wandelroute in Kelchterhoef',
    mediaType: 'youtube-short',
    categories: ['Content Creation'],
    tags: ['De Wijers', 'Stage', 'Social Media'],
    link: 'https://youtube.com/shorts/94oh3a0RAQE',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: '94oh3a0RAQE',
  },
  {
    title: 'Wandelroute in de kijker',
    kind: 'Socialmediavideo',
    summary:
      'Ook voor deze stagevideo zette ik een wandelroute in De Wijers in de kijker. Ik verzorgde zelf de opnames, de volledige montage en de publicatie op sociale media.',
    role: 'Opname, montage & social media',
    mediaSrc: '',
    mediaAlt: 'Still uit een video over een wandelroute in De Wijers',
    mediaType: 'youtube-short',
    categories: ['Content Creation'],
    tags: ['De Wijers', 'Stage', 'Social Media'],
    link: 'https://youtube.com/shorts/Zt3qLUpgYpI',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'Zt3qLUpgYpI',
  },
]

const filterOptions: ProjectCategory[] = [
  'Presentatie',
  'Voice-over',
  'Multicamera',
  'Content Creation',
]

const filteredProjects = computed(() => {
  const activeFilters = projectFilters.value

  return activeFilters.length === 0
    ? projects
    : projects.filter((project) =>
        project.categories.some((category) => activeFilters.includes(category))
      )
})

const projectsPerPage = 8
const currentListPage = ref(0)
const totalListPages = computed(() => Math.ceil(filteredProjects.value.length / projectsPerPage))
const paginatedProjects = computed(() => {
  const startIndex = currentListPage.value * projectsPerPage

  return filteredProjects.value
    .slice(startIndex, startIndex + projectsPerPage)
    .map((project, index) => ({ project, projectIndex: startIndex + index }))
})

function toggleProjectFilter(category: ProjectCategory) {
  projectFilters.value = projectFilters.value.includes(category) ? [] : [category]
}

const activeIndex = ref(0)
const isPaused = ref(false)
const isUnmuted = ref(false)
const isAutoplayEnabled = ref(true)
const volume = ref(0.85)
const autoplayMs = 6000
const activeVideoEl = ref<HTMLVideoElement | null>(null)
const featuredCardEl = ref<HTMLElement | null>(null)
const isProjectMediaVisible = ref(false)

let autoplayTimer: ReturnType<typeof setInterval> | null = null
let projectMediaObserver: IntersectionObserver | null = null

const activeProject = computed(() => filteredProjects.value[activeIndex.value])
const activeGalleryIndex = ref(0)
const activeGalleryImage = computed(() =>
  activeProject.value.gallery?.[activeGalleryIndex.value] ?? {
    src: activeProject.value.mediaSrc,
    alt: activeProject.value.mediaAlt,
  }
)
const modalYoutubeId = ref<string | null>(null)
const detailProject = ref<ProjectDetail | null>(null)
const isInlineAudible = (mediaType: ProjectItem['mediaType']) =>
  mediaType === 'video' || mediaType === 'youtube' || mediaType === 'youtube-short'

function syncAudioState() {
  if (!isInlineAudible(activeProject.value.mediaType)) {
    isUnmuted.value = false
  }
}

function openVideoModal(youtubeId: string, title: string) {
  modalYoutubeId.value = youtubeId
  isPaused.value = true
  ;(window as Window & { plausible?: (...args: any[]) => void }).plausible?.('Video Modal Open', {
    props: { project: title },
  })
}

function closeVideoModal() {
  modalYoutubeId.value = null
  isPaused.value = false
}

function trackFragmentOpen(project: ProjectItem) {
  if (project.mediaType !== 'video') return
  ;(window as Window & { plausible?: (...args: any[]) => void }).plausible?.('Video Fragment Open', {
    props: { project: project.title },
  })
}

function openDetailModal(detail: ProjectDetail) {
  detailProject.value = detail
  isPaused.value = true
  ;(window as Window & { plausible?: (...args: any[]) => void }).plausible?.('Project Detail Open', {
    props: { project: detail.title },
  })
}

function closeDetailModal() {
  detailProject.value = null
  isPaused.value = false
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && modalYoutubeId.value) {
    closeVideoModal()
  }
  if (event.key === 'Escape' && detailProject.value) {
    closeDetailModal()
  }
}

function goTo(index: number) {
  activeIndex.value = index
  syncAudioState()
  isAutoplayEnabled.value = false
  stopAutoplay()
}

function goToListPage(page: number) {
  currentListPage.value = page
  goTo(page * projectsPerPage)
}

function nextProject() {
  activeIndex.value = (activeIndex.value + 1) % filteredProjects.value.length
  syncAudioState()
}

function nextProjectManually() {
  nextProject()
  isAutoplayEnabled.value = false
  stopAutoplay()
}

function prevProject() {
  activeIndex.value = (activeIndex.value - 1 + filteredProjects.value.length) % filteredProjects.value.length
  syncAudioState()
}

function prevProjectManually() {
  prevProject()
  isAutoplayEnabled.value = false
  stopAutoplay()
}

function goToGalleryImage(index: number) {
  activeGalleryIndex.value = index
  isAutoplayEnabled.value = false
  stopAutoplay()
}

function nextGalleryImage() {
  const total = activeProject.value.gallery?.length ?? 0
  if (total) goToGalleryImage((activeGalleryIndex.value + 1) % total)
}

function prevGalleryImage() {
  const total = activeProject.value.gallery?.length ?? 0
  if (total) goToGalleryImage((activeGalleryIndex.value - 1 + total) % total)
}

function startAutoplay() {
  if (autoplayTimer) return

  autoplayTimer = setInterval(() => {
    if (isAutoplayEnabled.value && !isPaused.value && !isUnmuted.value) {
      nextProject()
    }
  }, autoplayMs)
}

function stopAutoplay() {
  if (!autoplayTimer) return
  clearInterval(autoplayTimer)
  autoplayTimer = null
}

function toggleAudio() {
  if (!isUnmuted.value && volume.value <= 0) {
    volume.value = 0.65
  }
  isUnmuted.value = !isUnmuted.value
}

function syncVideoAudio() {
  if (!activeVideoEl.value) return
  activeVideoEl.value.volume = volume.value
  activeVideoEl.value.muted = !isUnmuted.value
}

onMounted(() => {
  startAutoplay()
  syncVideoAudio()
  window.addEventListener('keydown', onKeydown)

  projectMediaObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isProjectMediaVisible.value = true
        projectMediaObserver?.disconnect()
        projectMediaObserver = null
      }
    },
    { rootMargin: '300px 0px' }
  )

  if (featuredCardEl.value) {
    projectMediaObserver.observe(featuredCardEl.value)
  }
})

onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKeydown)
  projectMediaObserver?.disconnect()
  projectMediaObserver = null
})

watch([activeIndex, isUnmuted, volume], async () => {
  await nextTick()
  syncVideoAudio()
})

watch(activeIndex, (index) => {
  activeGalleryIndex.value = 0
  currentListPage.value = Math.floor(index / projectsPerPage)
})

watch(
  projectFilters,
  () => {
    activeIndex.value = 0
    currentListPage.value = 0
    syncAudioState()
    isAutoplayEnabled.value = true
  },
  { deep: true }
)
</script>

<template>
  <SlideSection
    id="projecten"
    aos="fade-up"
    :aos-delay="120"
    section-class="snap-start flex items-start !min-h-[100svh] !pt-10 !pb-6 md:!pt-12"
  >
    <div class="mx-auto w-full max-w-[1320px]">
      <div class="mb-6 flex items-end justify-between gap-4">
        <h2 class="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9] uppercase">Projecten</h2>
      </div>

      <div class="grid gap-4 lg:grid-cols-[1fr_1.9fr] lg:gap-6">
        <div
          ref="featuredCardEl"
          class="featured-card order-2 overflow-hidden rounded-3xl border border-red-700/25 bg-[#f7e8dc] shadow-[0_18px_35px_rgba(0,0,0,0.13)] lg:h-[680px]"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <Transition name="project-fade" mode="out-in">
            <article
              :key="activeProject.title"
              :class="activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
                ? 'md:grid md:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.25fr)] lg:h-full'
                : 'lg:flex lg:h-full lg:flex-col'"
            >
              <div
                :class="[
                  'relative overflow-hidden',
                  activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
                    ? 'mx-auto h-[520px] w-full max-w-[293px] min-[420px]:h-[600px] min-[420px]:max-w-[338px] md:mx-0 md:h-full md:min-h-[560px] md:max-w-none'
                    : 'h-[220px] min-[420px]:h-[250px] sm:h-[310px] md:h-[360px]'
                ]"
              >
                <video
                  v-if="isProjectMediaVisible && activeProject.mediaType === 'video'"
                  ref="activeVideoEl"
                  :src="activeProject.mediaSrc"
                  :class="[
                    'h-full w-full object-cover transition duration-300',
                    !isUnmuted ? 'grayscale brightness-[0.55]' : 'grayscale-0 brightness-100'
                  ]"
                  autoplay
                  preload="metadata"
                  :muted="!isUnmuted"
                  loop
                  playsinline
                ></video>
                <YoutubePlayer
                  v-else-if="isProjectMediaVisible && (activeProject.mediaType === 'youtube' || activeProject.mediaType === 'youtube-short')"
                  :video-id="activeProject.youtubeId!"
                  :muted="!isUnmuted"
                  :volume="volume"
                  :class="[
                    'transition duration-300',
                    !isUnmuted ? 'grayscale brightness-[0.55]' : 'grayscale-0 brightness-100'
                  ]"
                />
                <Transition v-else-if="isProjectMediaVisible && activeProject.mediaType === 'gallery'" name="photo-fade" mode="out-in">
                  <img
                    :key="activeGalleryImage.src"
                    :src="activeGalleryImage.src"
                    :alt="activeGalleryImage.alt"
                    loading="lazy"
                    decoding="async"
                    class="h-full w-full object-cover"
                  />
                </Transition>
                <img
                  v-else-if="isProjectMediaVisible"
                  :src="activeProject.mediaSrc"
                  :alt="activeProject.mediaAlt"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
                <div v-else class="flex h-full w-full items-center justify-center bg-[#ead4c5] px-6 text-center">
                  <p class="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-red-700/65">
                    Media wordt geladen zodra de projecten in beeld komen
                  </p>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/0"></div>
                <template v-if="activeProject.mediaType === 'gallery' && activeProject.gallery && activeProject.gallery.length > 1">
                  <button
                    type="button"
                    class="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f9ede4]/60 bg-black/45 text-2xl text-[#f9ede4] transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9ede4]"
                    aria-label="Vorige foto"
                    @click.stop="prevGalleryImage"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f9ede4]/60 bg-black/45 text-2xl text-[#f9ede4] transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9ede4]"
                    aria-label="Volgende foto"
                    @click.stop="nextGalleryImage"
                  >
                    &#8250;
                  </button>
                  <div class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5" aria-label="Foto kiezen">
                    <button
                      v-for="(_, index) in activeProject.gallery"
                      :key="index"
                      type="button"
                      class="h-2 rounded-full bg-[#f9ede4] transition-all"
                      :class="index === activeGalleryIndex ? 'w-6 opacity-100' : 'w-2 opacity-55 hover:opacity-85'"
                      :aria-label="`Ga naar foto ${index + 1}`"
                      :aria-current="index === activeGalleryIndex ? 'true' : undefined"
                      @click.stop="goToGalleryImage(index)"
                    ></button>
                  </div>
                  <p class="absolute right-3 top-3 z-20 rounded-full bg-black/50 px-2.5 py-1 text-[0.68rem] font-semibold text-[#f9ede4]">
                    {{ activeGalleryIndex + 1 }} / {{ activeProject.gallery.length }}
                  </p>
                </template>
                <p class="absolute bottom-3 left-3 rounded-full bg-[#f9ede4]/95 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.11em] text-red-700">
                  {{ activeProject.kind }}
                </p>
                <div
                  v-if="isInlineAudible(activeProject.mediaType) && !isUnmuted"
                  class="absolute inset-0 z-20 flex items-center justify-center bg-black/35 p-4"
                >
                  <button
                    type="button"
                    class="unmute-cta rounded-2xl border-2 border-[#f9ede4] bg-red-700 px-4 py-3 text-center text-[0.78rem] font-black uppercase tracking-[0.11em] text-[#f9ede4] shadow-[0_14px_28px_rgba(0,0,0,0.35)] transition hover:scale-[1.02] hover:bg-[#a90d10] min-[420px]:px-6 min-[420px]:py-4 min-[420px]:text-[0.86rem]"
                    :aria-pressed="false"
                    @click="toggleAudio"
                  >
                    Klik om te unmuten
                  </button>
                </div>

                <div
                  v-if="isInlineAudible(activeProject.mediaType) && isUnmuted"
                  class="group/volume absolute left-3 top-3 z-20 flex items-center gap-2"
                >
                  <button
                    type="button"
                    class="rounded-full border border-[#f9ede4]/70 bg-black/45 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.11em] text-[#f9ede4] transition hover:bg-black/60"
                    :aria-pressed="true"
                    @click="toggleAudio"
                  >
                    Mute
                  </button>
                  <div
                    class="flex items-center gap-2 rounded-full border border-[#f9ede4]/70 bg-black/55 px-3 py-1.5 opacity-100 transition md:pointer-events-none md:opacity-0 md:group-hover/volume:pointer-events-auto md:group-hover/volume:opacity-100 md:group-focus-within/volume:pointer-events-auto md:group-focus-within/volume:opacity-100"
                  >
                    <input
                      v-model.number="volume"
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      class="h-1.5 w-24 cursor-pointer accent-[#f9ede4]"
                      aria-label="Volume"
                    />
                    <span class="w-10 text-right text-[0.62rem] font-bold uppercase tracking-[0.08em] text-[#f9ede4]">
                      {{ Math.round(volume * 100) }}%
                    </span>
                  </div>
                </div>
              </div>

              <div
                :class="[
                  'space-y-3 p-4 min-[420px]:p-5 md:p-6',
                  activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
                    ? 'md:flex md:flex-col md:justify-center lg:min-h-0 lg:overflow-y-auto'
                    : 'lg:min-h-0 lg:flex-1 lg:overflow-y-auto'
                ]"
              >
                <h3 class="font-display text-[clamp(1.55rem,4vw,3rem)] leading-[0.92] uppercase">
                  {{ activeProject.title }}
                </h3>

                <p class="max-w-[80ch] text-[clamp(0.95rem,1.2vw,1.08rem)] leading-[1.45] text-red-700/90">
                  {{ activeProject.summary }}
                </p>

                <p class="text-[0.82rem] font-semibold uppercase tracking-[0.08em] text-red-700/80">
                  Rol: {{ activeProject.role }}
                </p>

                <ul class="flex flex-wrap gap-2 pt-1">
                  <li
                    v-for="tag in activeProject.tags"
                    :key="`${activeProject.title}-${tag}`"
                    class="rounded-full border border-red-700/30 bg-white/65 px-2.5 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-red-700"
                  >
                    {{ tag }}
                  </li>
                </ul>

                <div class="flex flex-wrap items-center gap-2 pt-2">
                  <a
                    v-if="activeProject.link"
                    :href="activeProject.link"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center rounded-full border border-red-700 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4] min-[420px]:px-4 min-[420px]:text-[0.78rem]"
                    @click="trackFragmentOpen(activeProject)"
                  >
                    {{ activeProject.linkLabel }}
                  </a>
                  <button
                    v-if="activeProject.youtubeId && activeProject.mediaType !== 'youtube' && activeProject.mediaType !== 'youtube-short'"
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4] min-[420px]:px-4 min-[420px]:text-[0.78rem]"
                    @click="openVideoModal(activeProject.youtubeId, activeProject.title)"
                  >
                    Bekijk volledige aflevering
                  </button>
                  <button
                    v-if="activeProject.detail"
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4] min-[420px]:px-4 min-[420px]:text-[0.78rem]"
                    @click="openDetailModal(activeProject.detail)"
                  >
                    Meer info
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700/35 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 min-[420px]:text-[0.75rem]"
                    @click="prevProjectManually"
                  >
                    Vorige
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700/35 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 min-[420px]:text-[0.75rem]"
                    @click="nextProjectManually"
                  >
                    Volgende
                  </button>
                </div>
              </div>
            </article>
          </Transition>
        </div>

        <aside class="project-list order-1 rounded-3xl border border-red-700/20 bg-[#f9ede4] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.1)] md:p-4 lg:flex lg:h-[680px] lg:flex-col lg:overflow-hidden">
          <p class="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-red-700/70">Projectlijst</p>

          <ul class="mb-3 flex flex-nowrap gap-1 overflow-x-auto">
            <li v-for="option in filterOptions" :key="option" class="shrink-0">
              <label
                class="inline-flex cursor-pointer items-center whitespace-nowrap rounded-full border px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.04em] transition min-[1200px]:px-2.5 min-[1200px]:text-[0.62rem]"
                :class="projectFilters.includes(option)
                  ? 'border-red-700 bg-red-700 text-[#f9ede4]'
                  : 'border-red-700/30 bg-white/55 text-red-700/80 hover:border-red-700/60'"
              >
                <input
                  class="sr-only"
                  type="checkbox"
                  :checked="projectFilters.includes(option)"
                  :value="option"
                  @change="toggleProjectFilter(option)"
                />
                {{ option }}
              </label>
            </li>
          </ul>

          <ol class="space-y-2 lg:min-h-0 lg:flex-1 lg:overflow-y-auto">
            <li v-for="{ project, projectIndex } in paginatedProjects" :key="project.title">
              <button
                type="button"
                class="project-list-item w-full rounded-2xl border px-3 py-2 text-left transition"
                :class="projectIndex === activeIndex
                  ? 'border-red-700 bg-[#f4ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.09)]'
                  : 'border-red-700/15 bg-white/55 hover:border-red-700/40'"
                @click="goTo(projectIndex)"
              >
                <p class="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-red-700/65">{{ String(projectIndex + 1).padStart(2, '0') }} · {{ project.kind }}</p>
                <p class="mt-1 font-display text-[clamp(1rem,1.7vw,1.3rem)] leading-[0.95] uppercase text-red-700">
                  {{ project.title }}
                </p>
              </button>
            </li>
          </ol>

          <nav
            v-if="totalListPages > 1"
            class="mt-3 flex items-center justify-between gap-2 border-t border-red-700/15 pt-3"
            aria-label="Projectpagina's"
          >
            <button
              type="button"
              class="rounded-full border border-red-700/30 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] text-red-700 transition disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="currentListPage === 0"
              @click="goToListPage(currentListPage - 1)"
            >
              Vorige
            </button>

            <div class="flex items-center gap-1" aria-label="Pagina kiezen">
              <button
                v-for="page in totalListPages"
                :key="page"
                type="button"
                class="flex h-7 w-7 items-center justify-center rounded-full border text-[0.68rem] font-bold transition"
                :class="currentListPage === page - 1
                  ? 'border-red-700 bg-red-700 text-[#f9ede4]'
                  : 'border-red-700/25 bg-white/55 text-red-700 hover:border-red-700/60'"
                :aria-label="`Ga naar projectpagina ${page}`"
                :aria-current="currentListPage === page - 1 ? 'page' : undefined"
                @click="goToListPage(page - 1)"
              >
                {{ page }}
              </button>
            </div>

            <button
              type="button"
              class="rounded-full border border-red-700/30 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] text-red-700 transition disabled:cursor-not-allowed disabled:opacity-35"
              :disabled="currentListPage === totalListPages - 1"
              @click="goToListPage(currentListPage + 1)"
            >
              Volgende
            </button>
          </nav>
        </aside>
      </div>
    </div>
  </SlideSection>

  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modalYoutubeId"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 md:p-10"
        @click.self="closeVideoModal"
      >
        <div class="relative w-full max-w-4xl">
          <button
            type="button"
            class="absolute -top-10 right-0 text-[0.78rem] font-bold uppercase tracking-[0.1em] text-[#f9ede4] transition hover:text-red-300"
            @click="closeVideoModal"
          >
            Sluiten ✕
          </button>
          <div class="aspect-video w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            <iframe
              :src="`https://www.youtube.com/embed/${modalYoutubeId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0`"
              class="h-full w-full"
              title="Volledige aflevering"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <Teleport to="body">
    <Transition name="modal-fade">
      <ProjectDetailModal v-if="detailProject" :detail="detailProject" @close="closeDetailModal" />
    </Transition>
  </Teleport>
</template>

<style scoped>
.project-fade-enter-active,
.project-fade-leave-active {
  transition: opacity 240ms ease, transform 240ms ease;
}

.project-fade-enter-from,
.project-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.photo-fade-enter-active,
.photo-fade-leave-active {
  transition: opacity 180ms ease;
}

.photo-fade-enter-from,
.photo-fade-leave-to {
  opacity: 0;
}

.project-list-item {
  position: relative;
}

.project-list-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12%;
  height: 76%;
  width: 4px;
  border-radius: 99px;
  background: rgba(200, 15, 18, 0.26);
  transition: background 170ms ease;
}

.project-list-item:hover::before {
  background: rgba(200, 15, 18, 0.5);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 200ms ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
