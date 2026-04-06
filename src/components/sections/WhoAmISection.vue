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
        <p class="max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Mijn naam is Joke, een vrolijke perfectionist. Elke zaterdag presenteer ik het programma ‘Blokke Met
          Jokke’ op Radio Mol, een lokale radiozender. Vanaf het moment dat ik voor een micro sta, merk ik dat er
          automatisch een knop omslaagt in mijn hoofd. Ik sta aan en ga ervoor.
        </p>
        <p class="max-w-[40ch] text-left md:text-justify text-[clamp(0.95rem,1.45vw,1.45rem)] leading-[1.45]">
          Van jongs af aan ben ik bezig met mijn stem. Ik volgde dictie, deed toneel en leerde luider spreken,
          omdat ik vroeger heel stil was. Ondertussen is mijn stem gebruiken iets waar ik me volledig in thuisvoel.
        </p>
      </div>

      <div class="relative flex justify-center lg:min-h-[420px] lg:block">
        <PolaroidPhoto
          :src="jokeImg"
          alt="Joke achter de mengtafel"
          wrapper-class="h-[170px] w-[min(84vw,320px)] min-[420px]:h-[210px] min-[420px]:w-[300px] md:h-[250px] md:w-[340px] lg:absolute lg:right-8 lg:top-16 lg:h-[250px] lg:w-[250px] xl:right-20 xl:top-14 xl:h-[340px] xl:w-[340px]"
          rotate-class="rotate-[4deg] lg:rotate-[9deg]"
          image-class="object-[50%_32%]"
        />
        <PolaroidPhoto
          :src="jokeImg"
          alt="Joke in tv-regie"
          wrapper-class="hidden h-[170px] w-full min-[420px]:h-[210px] md:h-[250px] lg:absolute lg:right-10 lg:top-[4.45rem] lg:block lg:h-[250px] lg:w-[250px] xl:right-[5.6rem] xl:top-[3.9rem] xl:h-[340px] xl:w-[340px]"
          rotate-class="-rotate-[4deg] lg:-rotate-[12deg]"
          image-class="object-[50%_32%]"
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
