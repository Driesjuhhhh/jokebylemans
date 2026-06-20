<script setup lang="ts">
export type ProjectDetailPhase = {
  title: string
  description: string
}

export type ProjectDetailImage = {
  src: string
  alt: string
}

export type ProjectDetail = {
  title: string
  tagline: string
  intro: string
  phases: ProjectDetailPhase[]
  team: string[]
  context: string
  externalUrl: string
  externalLinkLabel: string
  images?: ProjectDetailImage[]
}

import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  detail: ProjectDetail
}>()

defineEmits<{
  close: []
}>()

const activeImageIndex = ref(0)

onMounted(() => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
})

function nextImage() {
  const total = props.detail.images?.length ?? 0
  if (total) activeImageIndex.value = (activeImageIndex.value + 1) % total
}

function prevImage() {
  const total = props.detail.images?.length ?? 0
  if (total) activeImageIndex.value = (activeImageIndex.value - 1 + total) % total
}
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/80 p-0 md:items-center md:p-6"
    @click.self="$emit('close')"
    @wheel.stop
  >
    <div
      class="relative flex h-full w-full max-w-3xl flex-col overflow-y-auto overscroll-contain rounded-none bg-[#f9ede4] shadow-[0_25px_60px_rgba(0,0,0,0.5)] md:h-auto md:max-h-[88vh] md:rounded-3xl"
    >
      <button
        type="button"
        class="sticky top-3 z-10 ml-auto mr-3 rounded-full border border-red-700/40 bg-[#f9ede4]/90 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-red-700 transition hover:bg-red-700 hover:text-[#f9ede4]"
        @click="$emit('close')"
      >
        Sluiten ✕
      </button>

      <div class="space-y-6 px-5 pb-8 pt-0 md:px-9">
        <header class="space-y-2">
          <p class="text-[0.74rem] font-bold uppercase tracking-[0.13em] text-red-700/70">{{ detail.tagline }}</p>
          <h3 class="font-display text-[clamp(1.9rem,5vw,3.2rem)] leading-[0.92] uppercase">{{ detail.title }}</h3>
          <p class="max-w-[70ch] text-[clamp(0.95rem,1.2vw,1.08rem)] leading-[1.5] text-red-700/90">
            {{ detail.intro }}
          </p>
        </header>

        <section v-if="detail.images?.length" class="space-y-2">
          <div class="relative overflow-hidden rounded-2xl border border-red-700/20 bg-black">
            <img
              :src="detail.images[activeImageIndex].src"
              :alt="detail.images[activeImageIndex].alt"
              class="h-56 w-full object-cover sm:h-80"
            />
            <template v-if="detail.images.length > 1">
              <button
                type="button"
                class="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-[#f9ede4] transition hover:bg-black/65"
                aria-label="Vorige foto"
                @click="prevImage"
              >
                ‹
              </button>
              <button
                type="button"
                class="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-lg text-[#f9ede4] transition hover:bg-black/65"
                aria-label="Volgende foto"
                @click="nextImage"
              >
                ›
              </button>
              <p class="absolute bottom-2 right-2 rounded-full bg-black/55 px-2 py-0.5 text-[0.68rem] font-semibold text-[#f9ede4]">
                {{ activeImageIndex + 1 }} / {{ detail.images.length }}
              </p>
            </template>
          </div>
          <div v-if="detail.images.length > 1" class="flex items-center justify-center gap-1.5">
            <button
              v-for="(image, index) in detail.images"
              :key="image.src"
              type="button"
              class="h-1.5 rounded-full transition"
              :class="index === activeImageIndex ? 'w-5 bg-red-700' : 'w-1.5 bg-red-700/30'"
              :aria-label="`Ga naar foto ${index + 1}`"
              @click="activeImageIndex = index"
            ></button>
          </div>
        </section>

        <section>
          <h4 class="mb-3 text-[0.78rem] font-bold uppercase tracking-[0.13em] text-red-700/70">Hoe verloopt het programma?</h4>
          <ol class="space-y-3">
            <li
              v-for="(phase, index) in detail.phases"
              :key="phase.title"
              class="flex gap-3 rounded-2xl border border-red-700/15 bg-white/55 p-3"
            >
              <span
                class="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-red-700/40 text-[0.78rem] font-black text-red-700"
              >{{ index + 1 }}</span>
              <div>
                <p class="font-display text-[clamp(1rem,1.6vw,1.2rem)] uppercase leading-[1]">{{ phase.title }}</p>
                <p class="mt-1 text-[0.92rem] leading-[1.4] text-red-700/90">{{ phase.description }}</p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h4 class="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.13em] text-red-700/70">Gemaakt door</h4>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="member in detail.team"
              :key="member"
              class="rounded-full border border-red-700/30 bg-white/65 px-3 py-1 text-[0.78rem] font-semibold text-red-700"
            >
              {{ member }}
            </li>
          </ul>
        </section>

        <section>
          <h4 class="mb-2 text-[0.78rem] font-bold uppercase tracking-[0.13em] text-red-700/70">Context</h4>
          <p class="max-w-[70ch] text-[0.92rem] leading-[1.5] text-red-700/90">{{ detail.context }}</p>
        </section>

        <a
          :href="detail.externalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center rounded-full border border-red-700 bg-red-700 px-4 py-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#f9ede4] transition hover:bg-[#a90d10]"
        >
          {{ detail.externalLinkLabel }}
        </a>
      </div>
    </div>
  </div>
</template>
