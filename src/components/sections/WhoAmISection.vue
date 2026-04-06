<script setup lang="ts">
import SlideSection from './SlideSection.vue'
import PolaroidPhoto from '../ui/PolaroidPhoto.vue'

import jokeImg from '../../assets/Joke.jpg'
</script>

<template>
  <SlideSection id="wie-ben-ik" aos="fade-right" :aos-delay="80" section-class="snap-start flex items-start py-2">
    <div class="grid h-full w-full items-center gap-8 lg:grid-cols-2">
      <div class="space-y-7 lg:pr-12">
        <h2 class="mb-7 font-display text-[clamp(2.6rem,6.7vw,5.6rem)] leading-[0.92] tracking-[0.01em] uppercase">Wie ben ik?</h2>
        <p class="max-w-[40ch] text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Mijn naam is Joke, een vrolijke perfectionist. Elke zaterdag presenteer ik het programma ‘Blokke Met
          Jokke’ op Radio Mol, een lokale radiozender. Vanaf het moment dat ik voor een micro sta, merk ik dat er
          automatisch een knop omslaagt in mijn hoofd. Ik sta aan en ga ervoor.
        </p>
        <p class="max-w-[40ch] text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Van jongs af aan ben ik bezig met mijn stem. Ik volgde dictie, deed toneel en leerde luider spreken,
          omdat ik vroeger heel stil was. Ondertussen is mijn stem gebruiken iets waar ik me volledig in thuisvoel.
        </p>
      </div>

      <div class="relative min-h-[420px]">
        <PolaroidPhoto
          :src="jokeImg"
          alt="Joke achter de mengtafel"
          wrapper-class="absolute right-8 top-16 z-10 h-[250px] w-[250px] md:right-20 md:top-14 md:h-[340px] md:w-[340px]"
          rotate-class="rotate-[9deg]"
        />
        <PolaroidPhoto
          :src="jokeImg"
          alt="Joke in tv-regie"
          wrapper-class="absolute right-10 top-[4.45rem] z-20 h-[250px] w-[250px] md:right-[5.6rem] md:top-[3.9rem] md:h-[340px] md:w-[340px]"
          rotate-class="-rotate-[12deg]"
        />
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
