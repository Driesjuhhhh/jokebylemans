<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SlideSection from './SlideSection.vue'
import YoutubePlayer from '../ui/YoutubePlayer.vue'
import ProjectDetailModal, { type ProjectDetail } from '../ui/ProjectDetailModal.vue'
import { projectFilters, type ProjectCategory } from '../../state/projectFilter'
import { projects as projectData, projectCategories, withBase, ui, fmt, type SiteImage } from '../../content/site'

type ProjectItem = {
  title: string
  kind: string
  summary: string
  role: string
  mediaSrc: string
  mediaAlt: string
  mediaType: 'video' | 'image' | 'gallery' | 'youtube' | 'youtube-short'
  previewLink?: string
  portrait?: boolean
  poster?: string
  gallery?: SiteImage[]
  youtubeId?: string
  categories: ProjectCategory[]
  tags: string[]
  link?: string
  linkLabel?: string
  detail?: ProjectDetail
}

// De projecten komen uit de CMS (collectie "projects"), de volgorde is het veld "Volgorde".
const projects: ProjectItem[] = projectData.map((project) => {
  const isVideo = project.mediaType === 'video'
  const hasStill = project.mediaType === 'image' || project.mediaType === 'gallery'
  return {
    title: project.title,
    kind: project.kind,
    summary: project.summary,
    role: project.role,
    mediaSrc: isVideo ? withBase(project.videoPath) : hasStill ? (project.image ?? '') : '',
    mediaAlt: project.mediaAlt,
    mediaType: project.mediaType,
    previewLink: project.previewLink ? withBase(project.previewLink) : undefined,
    portrait: project.portrait || undefined,
    poster: isVideo ? project.image : undefined,
    gallery: project.gallery.length ? project.gallery : undefined,
    youtubeId: project.youtubeId,
    categories: [project.category],
    tags: project.tags,
    link: project.link ? withBase(project.link) : undefined,
    linkLabel: project.linkLabel,
    detail: project.detail,
  }
})

const filterOptions: ProjectCategory[] = projectCategories

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
const visibleProjectRange = computed(() => {
  const first = currentListPage.value * projectsPerPage + 1
  const last = Math.min(first + projectsPerPage - 1, filteredProjects.value.length)

  return `${first}–${last} van ${filteredProjects.value.length}`
})
const paginatedProjects = computed(() => {
  const startIndex = currentListPage.value * projectsPerPage

  return filteredProjects.value
    .slice(startIndex, startIndex + projectsPerPage)
    .map((project, index) => ({ project, projectIndex: startIndex + index }))
})

function toggleProjectFilter(category: ProjectCategory) {
  projectFilters.value = projectFilters.value.includes(category)
    ? []
    : [category]
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

function openReconstructie() {
  const detail = projects.find((project) => project.title === 'De Reconstructie')?.detail
  if (detail) openDetailModal(detail)
}

defineExpose({ openReconstructie })

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
        <h2 class="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9] uppercase">{{ ui.projectsTitle }}</h2>
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
              :class="activeProject.portrait || activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
                ? 'md:grid md:grid-cols-[minmax(260px,0.75fr)_minmax(0,1.25fr)] lg:h-full'
                : 'lg:flex lg:h-full lg:flex-col'"
            >
              <div
                :class="[
                  'relative overflow-hidden',
                  activeProject.portrait || activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
                    ? 'mx-auto h-[520px] w-full max-w-[293px] min-[420px]:h-[600px] min-[420px]:max-w-[338px] md:mx-0 md:h-full md:min-h-[560px] md:max-w-none'
                    : 'h-[220px] min-[420px]:h-[250px] sm:h-[310px] md:h-[360px]'
                ]"
              >
                <video
                  v-if="isProjectMediaVisible && activeProject.mediaType === 'video'"
                  ref="activeVideoEl"
                  :src="activeProject.mediaSrc"
                  :poster="activeProject.poster"
                  :aria-label="activeProject.mediaAlt"
                  :class="[
                    'h-full w-full transition duration-300',
                    activeProject.portrait ? 'object-contain bg-black' : 'object-cover',
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
                    :style="activeGalleryImage.focus ? { objectPosition: activeGalleryImage.focus } : undefined"
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
                  class="h-full w-full"
                  :class="activeProject.portrait ? 'object-contain' : 'object-cover'"
                />
                <div v-else class="flex h-full w-full items-center justify-center bg-[#ead4c5] px-6 text-center">
                  <p class="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-red-700/65">
                    {{ ui.projectsLoading }}
                  </p>
                </div>

                <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/0"></div>
                <a
                  v-if="isProjectMediaVisible && activeProject.previewLink"
                  :href="activeProject.previewLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="group absolute inset-0 z-20 flex cursor-zoom-in items-end justify-center p-4 pb-14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-red-700"
                  :aria-label="ui.blogOpenAria"
                >
                  <span class="rounded-full bg-[#f9ede4]/95 px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-red-700 shadow-lg transition group-hover:bg-red-700 group-hover:text-[#f9ede4] group-focus-visible:bg-red-700 group-focus-visible:text-[#f9ede4]">
                    {{ ui.enlargeHint }}
                  </span>
                </a>
                <template v-if="activeProject.mediaType === 'gallery' && activeProject.gallery && activeProject.gallery.length > 1">
                  <button
                    type="button"
                    class="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f9ede4]/60 bg-black/45 text-2xl text-[#f9ede4] transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9ede4]"
                    :aria-label="ui.prevPhotoAria"
                    @click.stop="prevGalleryImage"
                  >
                    &#8249;
                  </button>
                  <button
                    type="button"
                    class="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#f9ede4]/60 bg-black/45 text-2xl text-[#f9ede4] transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f9ede4]"
                    :aria-label="ui.nextPhotoAria"
                    @click.stop="nextGalleryImage"
                  >
                    &#8250;
                  </button>
                  <div class="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1.5" :aria-label="ui.choosePhotoAria">
                    <button
                      v-for="(_, index) in activeProject.gallery"
                      :key="index"
                      type="button"
                      class="h-2 rounded-full bg-[#f9ede4] transition-all"
                      :class="index === activeGalleryIndex ? 'w-6 opacity-100' : 'w-2 opacity-55 hover:opacity-85'"
                      :aria-label="fmt(ui.goToPhotoAria, index + 1)"
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
                    {{ ui.unmuteHint }}
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
                    {{ ui.muteLabel }}
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
                      :aria-label="ui.volumeAria"
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
                  activeProject.portrait || activeProject.mediaType === 'youtube-short' || activeProject.mediaType === 'gallery'
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
                  {{ ui.roleLabel }} {{ activeProject.role }}
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
                    {{ ui.watchEpisodeLabel }}
                  </button>
                  <button
                    v-if="activeProject.detail"
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700 px-3 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4] min-[420px]:px-4 min-[420px]:text-[0.78rem]"
                    @click="openDetailModal(activeProject.detail)"
                  >
                    {{ ui.moreInfoLabel }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700/35 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 min-[420px]:text-[0.75rem]"
                    @click="prevProjectManually"
                  >
                    {{ ui.prevLabel }}
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center rounded-full border border-red-700/35 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 min-[420px]:text-[0.75rem]"
                    @click="nextProjectManually"
                  >
                    {{ ui.nextLabel }}
                  </button>
                </div>
              </div>
            </article>
          </Transition>
        </div>

        <aside class="project-list order-1 rounded-3xl border border-red-700/20 bg-[#f9ede4] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.1)] md:p-4 lg:flex lg:h-[680px] lg:flex-col lg:overflow-hidden">
          <p class="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-red-700/70">{{ ui.projectListTitle }}</p>

          <div
            class="mb-3 flex flex-nowrap gap-1 overflow-x-auto pb-1"
            role="group"
            :aria-label="ui.filterAria"
          >
            <button
              v-for="option in filterOptions"
              :key="option"
              type="button"
              class="inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border px-2 py-1 text-[0.58rem] font-bold uppercase tracking-[0.04em] transition min-[1200px]:px-2.5 min-[1200px]:text-[0.62rem]"
              :class="projectFilters.includes(option)
                ? 'border-red-700 bg-red-700 text-[#f9ede4]'
                : 'border-red-700/30 bg-white/55 text-red-700/80 hover:border-red-700/60'"
              :aria-pressed="projectFilters.includes(option)"
              @click="toggleProjectFilter(option)"
            >
              {{ option }}
            </button>
          </div>

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
            class="mt-3 border-t border-red-700/15 pt-3"
            :aria-label="ui.pagerAria"
          >
            <p class="mb-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-red-700/65">
              {{ visibleProjectRange }} {{ ui.projectsWord }}
            </p>
            <div class="flex items-center justify-between gap-2">
              <button
                type="button"
                class="rounded-full border border-red-700/30 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.06em] text-red-700 transition disabled:cursor-not-allowed disabled:opacity-35"
                :disabled="currentListPage === 0"
                @click="goToListPage(currentListPage - 1)"
              >
                {{ ui.prevLabel }}
              </button>

              <div class="flex items-center gap-1" :aria-label="ui.choosePageAria">
                <button
                  v-for="page in totalListPages"
                  :key="page"
                  type="button"
                  class="flex h-7 w-7 items-center justify-center rounded-full border text-[0.68rem] font-bold transition"
                  :class="currentListPage === page - 1
                    ? 'border-red-700 bg-red-700 text-[#f9ede4]'
                    : 'border-red-700/25 bg-white/55 text-red-700 hover:border-red-700/60'"
                  :aria-label="fmt(ui.goToPageAria, page)"
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
                {{ ui.nextLabel }}
              </button>
            </div>
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
            {{ ui.closeLabel }}
          </button>
          <div class="aspect-video w-full overflow-hidden rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
            <iframe
              :src="`https://www.youtube.com/embed/${modalYoutubeId}?autoplay=1&rel=0&modestbranding=1&cc_load_policy=0`"
              class="h-full w-full"
              :title="ui.episodeFrameTitle"
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
