<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import SlideSection from './SlideSection.vue'

const disableAosOnMobile = ref(false)

function updateAosMode() {
  disableAosOnMobile.value = window.innerWidth < 1024
}

onMounted(() => {
  updateAosMode()
  window.addEventListener('resize', updateAosMode)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateAosMode)
})
</script>

<template>
  <SlideSection
    id="hero"
    :aos="disableAosOnMobile ? false : undefined"
    section-class="snap-start relative mt-15 overflow-hidden flex items-center justify-center text-center !max-w-none !px-0"
  >
    <div class="hero-content">
      <h1 class="hero-word" aria-label="Portfolio">
        <span class="hero-shadow" aria-hidden="true">PORTFOLIO</span>
        <span class="hero-main">PORTFOLIO</span>
      </h1>
      <p class="hero-name">JOKE BYLEMANS</p>
      <p class="hero-tagline">Presentatrice · Voice-over · Radio Mol</p>

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

      <a href="#wie-ben-ik" class="hero-scroll" aria-label="Scroll naar Wie ben ik">
        <span class="hero-scroll-label">Scroll</span>
        <span class="hero-scroll-track" aria-hidden="true">
          <span class="hero-scroll-arrow"></span>
        </span>
      </a>
    </div>
  </SlideSection>
</template>

<style scoped>
.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 3vw, 2.5rem);
}

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

.hero-tagline {
  margin: clamp(0.35rem, 1.4vw, 0.85rem) auto 0;
  max-width: 40ch;
  font-size: clamp(0.84rem, 1.2vw, 1.03rem);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(200, 15, 18, 0.82);
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

.hero-scroll {
  margin-top: clamp(1.1rem, 2.8vw, 2.1rem);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.hero-scroll-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(200, 15, 18, 0.8);
}

.hero-scroll-track {
  display: block;
  width: 2px;
  height: 2.4rem;
  background: linear-gradient(to bottom, rgba(200, 15, 18, 0.2), rgba(200, 15, 18, 0.75));
  position: relative;
  border-radius: 999px;
}

.hero-scroll-arrow {
  position: absolute;
  left: 50%;
  bottom: -0.16rem;
  width: 0.58rem;
  height: 0.58rem;
  border-right: 2px solid #c80f12;
  border-bottom: 2px solid #c80f12;
  transform: translateX(-50%) rotate(45deg);
  animation: hero-scroll-arrow 1.6s ease-in-out infinite;
}

@keyframes hero-scroll-arrow {
  0% {
    transform: translate(-50%, -0.18rem) rotate(45deg);
    opacity: 0.45;
  }
  60% {
    transform: translate(-50%, 0.16rem) rotate(45deg);
    opacity: 0.95;
  }
  100% {
    transform: translate(-50%, -0.18rem) rotate(45deg);
    opacity: 0.45;
  }
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

  .hero-scroll {
    margin-top: 1.2rem;
  }
}
</style>
