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
    <div class="hero-socials">
      <a
        href="https://www.instagram.com/blokkemetjokke/"
        target="_blank"
        rel="noopener noreferrer"
        class="hero-social-btn"
      >
        Blokke Met Jokke
      </a>
      <a
        href="https://www.linkedin.com/in/joke-bylemans-04088025b/"
        target="_blank"
        rel="noopener noreferrer"
        class="hero-social-btn"
      >
        LinkedIn
      </a>
    </div>
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

.hero-socials {
  margin-top: clamp(1rem, 2.5vw, 2rem);
  display: flex;
  gap: 0.7rem;
  justify-content: center;
  align-items: center;
}

.hero-social-btn {
  border: 1px solid rgba(200, 15, 18, 0.45);
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c80f12;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.hero-social-btn:hover {
  background: #c80f12;
  color: #f7ebe2;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .hero-shadow {
    transform: translate(0.16rem, -0.16rem);
    -webkit-text-stroke: 2.6px #c80f12;
  }

  .hero-name {
    -webkit-text-stroke: 1.4px #c80f12;
  }

  .hero-socials {
    flex-direction: column;
    width: min(90vw, 290px);
    margin-inline: auto;
    align-items: center;
  }
}
</style>
