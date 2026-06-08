<script setup lang="ts">
import { computed, ref } from 'vue'
import SlideSection from './SlideSection.vue'
import PolaroidPhoto from '../ui/PolaroidPhoto.vue'

import jokeImg from '../../assets/Joke.jpg'
import rmMicImg from '../../assets/rm-mic.jpeg'
import rmLotteAnneImg from '../../assets/rm-lotte-anne.jpeg'
import rmAverageRobImg from '../../assets/rm-average-rob.jpeg'
import rmKerstImg from '../../assets/rm-kerst.JPG'

type PhotoItem = {
  src: string
  alt: string
}

const photos: PhotoItem[] = [
  { src: jokeImg, alt: 'Joke achter de mengtafel' },
  { src: rmMicImg, alt: 'Joke aan de microfoon' },
  { src: rmLotteAnneImg, alt: 'Joke in de studio met collega’s' },
  { src: rmAverageRobImg, alt: 'Joke tijdens een radiosegment' },
  { src: rmKerstImg, alt: 'Joke in kerstsfeer in de radiostudio' }
]

const frontIndex = ref(0)
const visibleDepth = 3

const visiblePhotos = computed(() =>
  Array.from({ length: Math.min(visibleDepth, photos.length) }, (_, depth) => {
    const index = (frontIndex.value + depth) % photos.length
    return {
      ...photos[index],
      index,
      depth
    }
  }).reverse()
)

const stackCardStyle = (depth: number) => {
  const offsetX = depth * 36
  const offsetY = depth * 26
  const rotate = [-10, 0, 12][depth] ?? 8
  const zIndex = 10 + (visibleDepth - depth)

  return {
    transform: `translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`,
    zIndex
  }
}

const showNextPhoto = () => {
  frontIndex.value = (frontIndex.value + 1) % photos.length
}
</script>

<template>
  <SlideSection id="wie-ben-ik" aos="fade-right" :aos-delay="80" section-class="snap-start flex items-start py-2">
    <div class="grid h-full w-full items-center gap-5 lg:gap-4 lg:grid-cols-2">
      <div class="space-y-7 lg:pr-6">
        <h2 class="mb-7 font-display text-[clamp(2.6rem,6.7vw,5.6rem)] leading-[0.92] tracking-[0.01em] uppercase">Wie ben ik?</h2>
        <p class="max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Mijn naam is Joke, een vrolijke perfectionist. Elke zaterdag presenteer ik het programma ‘Blokke Met
          Jokke’ op Radio Mol, een lokale radiozender. Vanaf het moment dat ik voor een micro sta, merk ik dat er
          automatisch een knop omslaat in mijn hoofd. Ik sta aan en ga ervoor.
        </p>
        <p class="max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Van jongs af aan ben ik bezig met mijn stem. Ik volgde dictie, deed toneel en leerde luider spreken,
          omdat ik vroeger heel stil was. Ondertussen is mijn stem gebruiken iets waar ik me volledig in thuis voel.
        </p>
      </div>

      <div class="relative flex justify-center lg:min-h-[420px] lg:block">
        <div
          class="group relative h-[230px] w-[min(86vw,360px)] min-[420px]:h-[270px] min-[420px]:w-[330px] md:h-[320px] md:w-[390px] lg:absolute lg:right-12 lg:top-10 lg:h-[320px] lg:w-[320px] xl:right-20 xl:top-10 xl:h-[410px] xl:w-[410px]"
        >
          <PolaroidPhoto
            v-for="photo in visiblePhotos"
            :key="photo.index"
            :src="photo.src"
            :alt="photo.alt"
            wrapper-class="absolute inset-0 h-full w-full"
            rotate-class="!rotate-0"
            image-class="object-center"
            :style="stackCardStyle(photo.depth)"
          />
          <span
            class="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs uppercase tracking-[0.14em] text-[#c80f12] opacity-80 transition group-hover:opacity-100"
          >
            klik voor volgende foto
          </span>
        </div>

        <button
          type="button"
          class="absolute right-0 top-1/2 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#c80f12] text-3xl font-bold leading-none text-white shadow-[0_10px_22px_rgba(0,0,0,0.28)] transition hover:scale-105 hover:bg-[#a80d10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c80f12] focus-visible:ring-offset-2 lg:-right-4 xl:right-8"
          @click="showNextPhoto"
          aria-label="Volgende foto"
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>
    </div>
  </SlideSection>
</template>

<style scoped>
.who-name {
  font-family: var(--font-signature);
  font-size: clamp(2rem, 3vw, 3.2rem);
  letter-spacing: 0.04em;
  color: transparent;
  -webkit-text-stroke: 2px #c80f12;
}
</style>
