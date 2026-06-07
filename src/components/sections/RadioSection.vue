<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import SlideSection from './SlideSection.vue'
import PolaroidPhoto from '../ui/PolaroidPhoto.vue'

import radioImage from '../../assets/rm-mic.jpeg'
import rmAverageRobImage from '../../assets/rm-average-rob.jpeg'
import rmKerstSilkeImage from '../../assets/rm-kerst-silke.jpeg'
import rmLotteAnneImage from '../../assets/rm-lotte-anne.jpeg'

const emit = defineEmits<{
  (event: 'listen-now'): void
}>()

const radioInstagramShots = [
  {
    src: rmAverageRobImage,
    alt: 'Rob tijdens Radio Mol uitzending',
  },
  {
    src: rmKerstSilkeImage,
    alt: 'Silke tijdens een opname bij Radio Mol',
  },
  {
    src: rmLotteAnneImage,
    alt: 'Lotte en Anne op Radio Mol',
  },
]

const radioMolUrl = 'https://www.radiomol.be/programma/blokkemetjokke'

const brusselsNow = ref(new Date())

let refreshTimer: ReturnType<typeof setInterval> | null = null

function updateBrusselsTime() {
  const now = new Date()
  brusselsNow.value = now
}

const isLiveNow = computed(() => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    weekday: 'short',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(brusselsNow.value)

  const weekday = parts.find((part) => part.type === 'weekday')?.value
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? -1)

  return weekday === 'Sat' && hour >= 15 && hour < 16
})

const liveStatusLabel = computed(() =>
  isLiveNow.value ? 'Live now' : 'Elke zaterdag 15:00 - 16:00'
)

function showIframePlayer() {
  emit('listen-now')
}

onMounted(() => {
  updateBrusselsTime()
  refreshTimer = setInterval(updateBrusselsTime, 30_000)
})

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
})
</script>

<template>
  <SlideSection
    id="radio-mol"
    aos="fade-right"
    :aos-delay="80"
    section-class="snap-start flex items-start py-2"
  >
    <div class="space-y-12 lg:space-y-14">
      <div class="relative grid h-full w-full items-center gap-8 lg:grid-cols-2">
        <article class="order-1 space-y-7 lg:order-2 lg:pl-12">
          <h2 class="mb-7 font-display text-[clamp(2.6rem,6.7vw,5.6rem)] leading-[0.92] tracking-[0.01em] uppercase">
            Radio Mol
          </h2>

          <p class="radio-copy max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
            Elke zaterdag presenteer ik het radioprogramma ‘Blokke Met Jokke’ op Radio Mol. Dit is echt een hobby
            geworden waar ik mezelf volledig in kan uitleven.
          </p>

          <p class="radio-copy max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
            In mijn programma steek ik studenten een hart onder de riem. Ik deel bloktips, weetjes over muziek en
            zeker ook tips om te ontspannen naast het studeren.
          </p>

          <div class="flex flex-wrap items-center gap-2">
            <span
              class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.72rem] font-bold uppercase tracking-[0.12em]"
              :class="isLiveNow
                ? 'animate-pulse border-red-700 bg-red-700 text-[#f8ebe0]'
                : 'border-red-700/35 bg-white/65 text-red-700'"
            >
              <span :class="['h-2 w-2 rounded-full', isLiveNow ? 'bg-[#f8ebe0]' : 'bg-red-700/55']"></span>
              {{ liveStatusLabel }}
            </span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="inline-flex items-center rounded-full border border-red-700 px-4 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4]"
              @click="showIframePlayer"
            >
              Luister nu op deze pagina
            </button>
            <a
              :href="radioMolUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center rounded-full border border-red-700/35 px-4 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700"
            >
              Programmapagina
            </a>
          </div>
        </article>

        <div class="relative order-2 flex justify-center lg:order-1 lg:min-h-[420px] lg:block">
          <div class="z-10 h-[170px] w-[min(84vw,320px)] overflow-hidden rounded-2xl border border-red-700/20 bg-white p-1.5 shadow-[0_12px_22px_rgba(0,0,0,0.13)] min-[420px]:h-[210px] min-[420px]:w-[300px] md:h-[250px] md:w-[340px] lg:absolute lg:left-2 lg:top-16 lg:h-[250px] lg:w-[250px] xl:left-8 xl:top-14 xl:h-[340px] xl:w-[340px]">
            <img
              :src="radioImage"
              alt="Joke presenteert in de radiostudio"
              class="h-full w-full rounded-xl object-cover"
            />
          </div>

          <PolaroidPhoto
            :src="radioImage"
            alt="Now Playing kaart van Blokke Met Jokke"
            wrapper-class="z-20 hidden h-[170px] w-full min-[420px]:h-[210px] md:h-[250px] lg:absolute lg:left-4 lg:top-[4.45rem] lg:block lg:h-[250px] lg:w-[250px] xl:left-10 xl:top-[3.9rem] xl:h-[340px] xl:w-[340px]"
            rotate-class="-rotate-[4deg] lg:-rotate-[10deg]"
          />
        </div>
      </div>

      <section class="space-y-5 border-t border-red-700/25 pt-8">
        <div class="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 class="font-display text-[clamp(1.8rem,4.8vw,3.2rem)] leading-[0.95] uppercase">Achter de micro</h3>
            <p class="mt-2 max-w-[56ch] text-[0.97rem] leading-[1.5] text-red-700/85">
              Een paar spontane momenten van Radio Mol — volg er meer op Instagram.
            </p>
          </div>
          <a
            href="https://www.instagram.com/blokkemetjokke/"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-red-700 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2]"
            aria-label="Instagram van Blokke Met Jokke"
          >
            <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
              <path
                d="M7.25 2h9.5A5.26 5.26 0 0 1 22 7.25v9.5A5.26 5.26 0 0 1 16.75 22h-9.5A5.26 5.26 0 0 1 2 16.75v-9.5A5.26 5.26 0 0 1 7.25 2Zm0 1.8A3.46 3.46 0 0 0 3.8 7.25v9.5a3.46 3.46 0 0 0 3.45 3.45h9.5a3.46 3.46 0 0 0 3.45-3.45v-9.5a3.46 3.46 0 0 0-3.45-3.45h-9.5Zm4.75 2.55a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.8a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5.88-.84a1.34 1.34 0 1 1-2.68 0 1.34 1.34 0 0 1 2.68 0Z"
              />
            </svg>
            Instagram
          </a>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <figure
            v-for="image in radioInstagramShots"
            :key="image.alt"
            class="group gallery-photo"
          >
            <img
              :src="image.src"
              :alt="image.alt"
              class="gallery-image w-full transition-transform duration-300 group-hover:-translate-y-1"
            />
          </figure>
        </div>
      </section>
    </div>
  </SlideSection>
</template>

<style scoped>
.radio-copy {
  letter-spacing: 0.01em;
}

.gallery-photo {
  height: clamp(460px, 56vh, 680px);
  border-radius: 1rem;
  overflow: hidden;
}

.gallery-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}
</style>
