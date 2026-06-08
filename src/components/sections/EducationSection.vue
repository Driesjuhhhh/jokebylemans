<script setup lang="ts">
import SlideSection from './SlideSection.vue'

import batacCutting from '../../assets/batac-cutting.jpeg'
import pxlMicImage from '../../assets/rm-mic.jpeg'

type EducationItem = {
  period: string
  institution: string
  program: string
  description: string
  highlight: string
  imageSrc: string
  imageAlt: string
  imagePositionClass?: string
}

const educations: EducationItem[] = [
  {
    period: '2022 - 2025',
    institution: 'Hogeschool PXL',
    program: 'Communicatie',
    description:
      'Tijdens deze opleiding (her)ontdekte ik mijn passie voor taal en presenteren. Ik begon mijn eigen radioprogramma; zowel op PXL Radio als op Radio Mol. ',
    highlight: 'Start van mijn eigen radioprogramma op PXL Radio en Radio Mol.',
    imageSrc: pxlMicImage,
    imageAlt: 'Joke met microfoon in PXL-studio',
  },
  {
    period: '2025 - 2026',
    institution: 'Thomas More',
    program: 'BATAC - Multicamera',
    description: 'Tijdens deze opleiding leerde ik enorm veel bij over hoe tv-programma’s achter de schermen gemaakt worden; zowel op productioneel als redactioneel vlak. Ik verbreedde hierdoor mijn kennis over het medialandschap én legde connecties.',
    highlight: 'Een eigen studioshow!',
    imageSrc: batacCutting,
    imageAlt: 'Joke in de studio van Radio Mol',
    imagePositionClass: 'object-[50%_61%]',
  },
  
]
</script>

<template>
  <SlideSection
    id="opleiding"
    aos="fade-left"
    :aos-delay="110"
    section-class="snap-start flex items-start !min-h-[100svh] !pt-10 !pb-4 md:!pt-12"
  >
    <div class="mx-auto w-full max-w-[1320px]">
      <div class="mb-4 flex items-end justify-between gap-4">
        <h2 class="font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.9] uppercase">Opleiding</h2>
      </div>

      <div class="timeline relative space-y-4 md:space-y-5">
        <div class="absolute bottom-0 left-4 top-0 w-[3px] rounded-full bg-red-700/25 md:left-1/2 md:-translate-x-1/2"></div>

        <article
          v-for="(item, index) in educations"
          :key="`${item.period}-${item.institution}`"
          class="relative pl-12 md:pl-0"
        >
          <span
            class="absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-red-700 bg-[#f6e8dd] md:left-1/2"
          ></span>

          <div
            :class="[
              'grid items-stretch gap-4 md:grid-cols-2 md:gap-8',
              index % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
            ]"
          >
            <div
              :class="[
                'edu-card relative overflow-hidden rounded-2xl border border-red-700/25 bg-gradient-to-br from-[#f9eee6] via-[#f5e7dc] to-[#efdfd2] p-4 shadow-[0_14px_28px_rgba(0,0,0,0.1)] md:min-h-[250px] lg:min-h-[280px]',
                index % 2 === 1 ? 'md:text-right' : ''
              ]"
            >
              <p class="edu-period text-xs font-semibold uppercase tracking-[0.15em] text-red-700/70">{{ item.period }}</p>
              <h3 class="mt-2 font-display text-[clamp(1.25rem,2.1vw,1.95rem)] leading-[0.98] uppercase">{{ item.institution }}</h3>
              <p class="mt-1.5 text-[0.8rem] font-bold uppercase tracking-[0.12em] text-red-700/85">{{ item.program }}</p>
              <p class="mt-3 text-[clamp(0.9rem,1vw,1rem)] leading-[1.45] text-red-700/90">{{ item.description }}</p>
              <p class="edu-highlight mt-3 text-[clamp(0.9rem,1vw,1rem)] leading-[1.35]">{{ item.highlight }}</p>
            </div>

            <figure class="overflow-hidden rounded-2xl border border-red-700/20 bg-white p-1.5 shadow-[0_12px_22px_rgba(0,0,0,0.13)] md:min-h-[250px] lg:min-h-[280px]">
              <img
                :src="item.imageSrc"
                :alt="item.imageAlt"
                :class="[
                  'h-[180px] w-full rounded-xl object-cover md:h-[250px] lg:h-[280px]',
                  item.imagePositionClass ?? ''
                ]"
              />
            </figure>
          </div>
        </article>
      </div>
    </div>
  </SlideSection>
</template>

<style scoped>
.edu-signature {
  font-family: var(--font-signature);
  font-size: clamp(1.35rem, 2.8vw, 2.8rem);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: clamp(1px, 0.12vw, 1.6px) #c80f12;
}

.edu-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5px;
  background: linear-gradient(180deg, #c80f12 0%, #e16c5c 100%);
}

.edu-period {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.edu-period::before {
  content: '';
  display: inline-block;
  height: 0.35rem;
  width: 0.35rem;
  border-radius: 999px;
  background: #c80f12;
}

.edu-highlight {
  border-top: 1px dashed rgba(200, 15, 18, 0.32);
  padding-top: 0.65rem;
  font-weight: 700;
  color: #b90e11;
}
</style>
