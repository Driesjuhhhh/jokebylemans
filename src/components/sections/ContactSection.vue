<script setup lang="ts">
import SlideSection from './SlideSection.vue'
</script>

<template>
  <SlideSection
    id="contact"
    aos="fade-up"
    :aos-delay="80"
    section-class="snap-start flex items-center !min-h-[50svh] !pt-8 !pb-8"
  >
    <div class="mx-auto w-full max-w-[980px]">
      <article class="rounded-3xl border border-red-700/25 bg-[#f8ede4]/90 px-5 py-6 text-center shadow-[0_12px_24px_rgba(0,0,0,0.08)] md:px-8 md:py-8">
        <h2 class="font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] uppercase">Contact</h2>
        <p class="mx-auto mt-3 max-w-[50ch] text-[clamp(0.95rem,1.5vw,1.15rem)] leading-[1.45] text-red-700/90">
          Stuur gerust een mail voor meer info.
        </p>
        <a
          href="mailto:joke@jokebylemans.be"
          class="mt-5 inline-flex items-center rounded-full border border-red-700 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2]"
        >
          joke@jokebylemans.be
        </a>
      </article>
    </div>
  </SlideSection>
</template>
