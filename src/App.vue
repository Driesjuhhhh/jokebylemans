<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'
import HeaderNavigation from './components/HeaderNavigation.vue'

import HeroSection from './components/sections/HeroSection.vue'
import WhoAmISection from './components/sections/WhoAmISection.vue'
import EducationSection from './components/sections/EducationSection.vue'
import RadioSection from './components/sections/RadioSection.vue'
import ProjectsSliderSection from './components/sections/ProjectsSliderSection.vue'
import RadioNowPlayingWidget from './components/RadioNowPlayingWidget.vue'

const WHEEL_ADVANCE_THRESHOLD = 42
const AUTO_SCROLL_LOCK_MS = 620

let sectionEls: HTMLElement[] = []
let wheelDeltaAccumulator = 0
let isAutoScrolling = false
let releaseAutoScrollTimer: ReturnType<typeof setTimeout> | null = null
let resetWheelAccumulatorTimer: ReturnType<typeof setTimeout> | null = null

const forceShowRadioPlayer = ref(false)
const currentYear = new Date().getFullYear()

function onListenNow() {
  forceShowRadioPlayer.value = true
}

function onCloseRadioPlayer() {
  forceShowRadioPlayer.value = false
}

function refreshSections() {
  sectionEls = Array.from(document.querySelectorAll('main > section')) as HTMLElement[]
}

function getClosestSectionIndex() {
  if (!sectionEls.length) return -1

  const viewportCenter = window.scrollY + window.innerHeight / 2
  let bestIndex = 0
  let bestDistance = Number.POSITIVE_INFINITY

  sectionEls.forEach((section, index) => {
    const sectionCenter = section.offsetTop + section.offsetHeight / 2
    const distance = Math.abs(sectionCenter - viewportCenter)

    if (distance < bestDistance) {
      bestDistance = distance
      bestIndex = index
    }
  })

  return bestIndex
}

function scrollToSection(index: number) {
  if (!sectionEls.length || index < 0 || index >= sectionEls.length) return

  sectionEls[index].scrollIntoView({ behavior: 'smooth', block: 'start' })
  isAutoScrolling = true
  if (releaseAutoScrollTimer) {
    clearTimeout(releaseAutoScrollTimer)
  }

  releaseAutoScrollTimer = setTimeout(() => {
    isAutoScrolling = false
  }, AUTO_SCROLL_LOCK_MS)
}

function shouldUseNativeScroll(event: WheelEvent, section: HTMLElement) {
  const sectionTop = section.offsetTop
  const sectionBottom = sectionTop + section.offsetHeight
  const viewportTop = window.scrollY
  const viewportBottom = viewportTop + window.innerHeight
  const isTallSection = section.offsetHeight > window.innerHeight + 40

  if (!isTallSection) return false

  const scrollingDown = event.deltaY > 0
  const nearTop = viewportTop <= sectionTop + 8
  const nearBottom = viewportBottom >= sectionBottom - 8

  return (scrollingDown && !nearBottom) || (!scrollingDown && !nearTop)
}

function onWheel(event: WheelEvent) {
  if (event.ctrlKey || !sectionEls.length || window.innerWidth < 900) return
  if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return

  if (isAutoScrolling) {
    event.preventDefault()
    return
  }

  const closestIndex = getClosestSectionIndex()
  if (closestIndex === -1) return
  const isScrollingDown = event.deltaY > 0
  const isAtFirstSection = closestIndex === 0
  const isAtLastSection = closestIndex === sectionEls.length - 1

  // Allow native scrolling past the first/last snap section so footer and top area stay reachable.
  if ((isAtLastSection && isScrollingDown) || (isAtFirstSection && !isScrollingDown)) {
    wheelDeltaAccumulator = 0
    return
  }

  const activeSection = sectionEls[closestIndex]
  if (shouldUseNativeScroll(event, activeSection)) {
    wheelDeltaAccumulator = 0
    return
  }

  event.preventDefault()

  wheelDeltaAccumulator += event.deltaY
  if (resetWheelAccumulatorTimer) {
    clearTimeout(resetWheelAccumulatorTimer)
  }
  resetWheelAccumulatorTimer = setTimeout(() => {
    wheelDeltaAccumulator = 0
  }, 220)

  if (Math.abs(wheelDeltaAccumulator) < WHEEL_ADVANCE_THRESHOLD) return

  const direction = wheelDeltaAccumulator > 0 ? 1 : -1
  const nextIndex = Math.max(0, Math.min(sectionEls.length - 1, closestIndex + direction))
  wheelDeltaAccumulator = 0

  if (nextIndex !== closestIndex) {
    scrollToSection(nextIndex)
  }
}

onMounted(() => {
  AOS.init({
    duration: 850,
    once: false,
    easing: 'ease-out-cubic',
    offset: 120,
  })

  refreshSections()
  window.addEventListener('resize', refreshSections)
  window.addEventListener('wheel', onWheel, { passive: false })
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', refreshSections)
  window.removeEventListener('wheel', onWheel)

  if (releaseAutoScrollTimer) {
    clearTimeout(releaseAutoScrollTimer)
    releaseAutoScrollTimer = null
  }

  if (resetWheelAccumulatorTimer) {
    clearTimeout(resetWheelAccumulatorTimer)
    resetWheelAccumulatorTimer = null
  }
})
</script>

<template>
  <HeaderNavigation />
  <main class="portfolio-bg text-red-700">
    <HeroSection />
    <WhoAmISection />
    <EducationSection />
    <ProjectsSliderSection />
    <RadioSection @listen-now="onListenNow" />
  </main>
  <footer class="border-t border-red-700/20 bg-[#f7ebe2] px-5 pt-4 pb-[calc(1.1rem+env(safe-area-inset-bottom))] text-center text-xs text-red-700 md:px-8 md:py-4 md:text-sm">
    &copy; {{ currentYear }}. Developed by <a
      href="https://driesbielen.be"
      target="_blank"
      rel="noopener noreferrer"
      class="ml-1 font-semibold"
    >
      Dries Bielen
    </a>.
    
  </footer>

  <RadioNowPlayingWidget :force-visible="forceShowRadioPlayer" @close="onCloseRadioPlayer" />
</template>
