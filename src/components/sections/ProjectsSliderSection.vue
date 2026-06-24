<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SlideSection from './SlideSection.vue'
import YoutubePlayer from '../ui/YoutubePlayer.vue'
import ProjectDetailModal, { type ProjectDetail } from '../ui/ProjectDetailModal.vue'
import { projectFilter, type ProjectCategory } from '../../state/projectFilter'

import keizersPinguing from '../../assets/pinguing.mp4'
import deWijers from '../../assets/Hoe is het landschap in De Wijers ontstaan.mp4'
import lily from '../../assets/lilly.mp4'
import tsjernobyl from '../../assets/Tsjerno.png'
import deReconstructieTrailer from '../../assets/batac-de-reconstructie-trailer.mp4'
import reconstructieRegie from '../../assets/reconstructie-regie.jpg'
import reconstructieCast from '../../assets/reconstructie-cast.jpg'
import reconstructieStudio from '../../assets/reconstructie-studio.jpg'
import reconstructieTeam from '../../assets/reconstructie-team.jpg'
import reconstructieInterview from '../../assets/reconstructie-interview.jpg'
import reconstructiePauze from '../../assets/reconstructie-pauze.jpg'
import reconstructieRegie2 from '../../assets/reconstructie-regie2.jpg'

type ProjectItem = {
  title: string
  kind: string
  summary: string
  role: string
  mediaSrc: string
  mediaAlt: string
  mediaType: 'video' | 'image' | 'youtube'
  youtubeId?: string
  category: ProjectCategory
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
    category: 'PXL',
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
    category: 'Extern',
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
    category: 'Extern',
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
    category: 'Thomas More',
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
    category: 'Thomas More',
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
    category: 'Thomas More',
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
    category: 'Thomas More',
    tags: ['BATAC', 'Studio', 'Muziekquiz'],
    link: 'https://youtu.be/XBqfetEI5As',
    linkLabel: 'Bekijk op YouTube',
    youtubeId: 'XBqfetEI5As',
  },
]

const filterOptions: ProjectCategory[] = ['Alles', 'PXL', 'Thomas More', 'Extern']

const filteredProjects = computed(() =>
  projectFilter.value === 'Alles'
    ? projects
    : projects.filter((project) => project.category === projectFilter.value)
)

const activeIndex = ref(0)
const isPaused = ref(false)
const isUnmuted = ref(false)
const isAutoplayEnabled = ref(true)
const volume = ref(0.85)
const autoplayMs = 6000
const activeVideoEl = ref<HTMLVideoElement | null>(null)

let autoplayTimer: ReturnType<typeof setInterval> | null = null

const activeProject = computed(() => filteredProjects.value[activeIndex.value])
const modalYoutubeId = ref<string | null>(null)
const detailProject = ref<ProjectDetail | null>(null)
const isInlineAudible = (mediaType: ProjectItem['mediaType']) => mediaType === 'video' || mediaType === 'youtube'

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
})

onBeforeUnmount(() => {
  stopAutoplay()
  window.removeEventListener('keydown', onKeydown)
})

watch([activeIndex, isUnmuted, volume], async () => {
  await nextTick()
  syncVideoAudio()
})

watch(projectFilter, () => {
  activeIndex.value = 0
  syncAudioState()
  isAutoplayEnabled.value = true
})
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
          class="featured-card order-2 overflow-hidden rounded-3xl border border-red-700/25 bg-[#f7e8dc] shadow-[0_18px_35px_rgba(0,0,0,0.13)]"
          @mouseenter="isPaused = true"
          @mouseleave="isPaused = false"
        >
          <Transition name="project-fade" mode="out-in">
            <article :key="activeProject.title">
              <div class="relative h-[220px] overflow-hidden min-[420px]:h-[250px] sm:h-[310px] md:h-[360px]">
                <video
                  v-if="activeProject.mediaType === 'video'"
                  ref="activeVideoEl"
                  :src="activeProject.mediaSrc"
                  :class="[
                    'h-full w-full object-cover transition duration-300',
                    !isUnmuted ? 'grayscale brightness-[0.55]' : 'grayscale-0 brightness-100'
                  ]"
                  autoplay
                  :muted="!isUnmuted"
                  loop
                  playsinline
                ></video>
                <YoutubePlayer
                  v-else-if="activeProject.mediaType === 'youtube'"
                  :video-id="activeProject.youtubeId!"
                  :muted="!isUnmuted"
                  :volume="volume"
                  :class="[
                    'transition duration-300',
                    !isUnmuted ? 'grayscale brightness-[0.55]' : 'grayscale-0 brightness-100'
                  ]"
                />
                <img
                  v-else
                  :src="activeProject.mediaSrc"
                  :alt="activeProject.mediaAlt"
                  class="h-full w-full object-cover"
                />

                <div class="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/0"></div>
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

              <div class="space-y-3 p-4 min-[420px]:p-5 md:p-6">
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
                    v-if="activeProject.youtubeId && activeProject.mediaType !== 'youtube'"
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

        <aside class="project-list order-1 rounded-3xl border border-red-700/20 bg-[#f9ede4] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.1)] md:p-4">
          <p class="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-red-700/70">Projectlijst</p>

          <ul class="mb-3 flex flex-wrap gap-2">
            <li v-for="option in filterOptions" :key="option">
              <button
                type="button"
                class="rounded-full border px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.08em] transition"
                :class="projectFilter === option
                  ? 'border-red-700 bg-red-700 text-[#f9ede4]'
                  : 'border-red-700/30 bg-white/55 text-red-700/80 hover:border-red-700/60'"
                @click="projectFilter = option"
              >
                {{ option }}
              </button>
            </li>
          </ul>

          <ol class="space-y-2">
            <li v-for="(project, index) in filteredProjects" :key="project.title">
              <button
                type="button"
                class="project-list-item w-full rounded-2xl border px-3 py-2 text-left transition"
                :class="index === activeIndex
                  ? 'border-red-700 bg-[#f4ddd0] shadow-[0_8px_18px_rgba(0,0,0,0.09)]'
                  : 'border-red-700/15 bg-white/55 hover:border-red-700/40'"
                @click="goTo(index)"
              >
                <p class="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-red-700/65">0{{ index + 1 }} · {{ project.kind }}</p>
                <p class="mt-1 font-display text-[clamp(1rem,1.7vw,1.3rem)] leading-[0.95] uppercase text-red-700">
                  {{ project.title }}
                </p>
              </button>
            </li>
          </ol>
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
              :src="`https://www.youtube.com/embed/${modalYoutubeId}?autoplay=1&rel=0&modestbranding=1`"
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
