<script setup lang="ts">
import SlideSection from './SlideSection.vue'
</script>

<template>
  <SlideSection
    id="hero"
    section-class="snap-start flex flex-col items-center justify-center text-center"
  >
    <h1 class="hero-word" aria-label="Portfolio">
      <span class="hero-shadow" aria-hidden="true">PORTFOLIO</span>
      <span class="hero-main">PORTFOLIO</span>
    </h1>
    <p class="hero-name">JOKE BYLEMANS</p>
  </SlideSection>
</template>

<style scoped>
.hero-word {
  position: relative;
  display: inline-block;
  font-family: var(--font-display);
  font-size: clamp(3.8rem, 16vw, 13rem);
  line-height: 0.88;
  letter-spacing: 0.03em;
}

.hero-shadow {
  position: absolute;
  inset: 0;
  transform: translate(0.4rem, -0.4rem);
  color: #f1dfd2;
  -webkit-text-stroke: 4px #c80f12;
  z-index: 0;
}

.hero-main {
  position: relative;
  z-index: 1;
  color: #c80f12;
}

.hero-name {
  margin-top: clamp(1.2rem, 3vw, 2.2rem);
  font-family: var(--font-signature);
  font-size: clamp(2.4rem, 5.8vw, 5.4rem);
  letter-spacing: 0.06em;
  color: transparent;
  -webkit-text-stroke: 2px #c80f12;
}

@media (max-width: 768px) {
  .hero-shadow {
    transform: translate(0.16rem, -0.16rem);
    -webkit-text-stroke: 2.6px #c80f12;
  }

  .hero-name {
    -webkit-text-stroke: 1.4px #c80f12;
  }
}
</style>
