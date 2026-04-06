<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    forceVisible?: boolean
  }>(),
  {
    forceVisible: false,
  }
)

const emit = defineEmits<{
  (event: 'close'): void
}>()

const brusselsNow = ref(new Date())
const isClosed = ref(false)

let refreshTimer: ReturnType<typeof setInterval> | null = null

function updateBrusselsTime() {
  brusselsNow.value = new Date()
}

const isLiveWindow = computed(() => {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Brussels',
    weekday: 'short',
    hour: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(brusselsNow.value)

  const weekday = parts.find((part) => part.type === 'weekday')?.value
  const hour = Number(parts.find((part) => part.type === 'hour')?.value ?? -1)

  return weekday === 'Sat' && hour >= 15 && hour < 16
})

const shouldShow = computed(() => isLiveWindow.value || props.forceVisible)
const shouldRender = computed(() => shouldShow.value && !isClosed.value)

function closePlayer() {
  isClosed.value = true
  emit('close')
}

onMounted(() => {
  updateBrusselsTime()
  refreshTimer = setInterval(updateBrusselsTime, 30_000)
})

watch(
  () => props.forceVisible,
  (isVisible) => {
    if (isVisible) {
      isClosed.value = false
    }
  }
)

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
})
</script>

<template>
  <Teleport to="body">
    <aside
      v-if="shouldRender"
      class="fixed bottom-3 left-1/2 z-[70] w-[min(360px,calc(100vw-1.2rem))] -translate-x-1/2 rounded-2xl border border-red-700/35 bg-[#f9ede4]/98 p-3 shadow-[0_18px_34px_rgba(0,0,0,0.24)] backdrop-blur sm:bottom-4 sm:left-auto sm:right-4 sm:w-[min(360px,calc(100vw-2rem))] sm:translate-x-0"
    >
      <div class="mb-2 flex items-center justify-between gap-3">
        <p class="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-red-700/75">Now Playing</p>
        <button
          type="button"
          class="inline-flex items-center rounded-full border border-red-700/35 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 hover:bg-red-700 hover:text-[#f9ede4]"
          @click="closePlayer"
        >
          Sluiten
        </button>
      </div>
      <p class="mb-2 text-[0.82rem] font-semibold uppercase tracking-[0.09em] text-red-700">Blokke Met Jokke · Live</p>

      <iframe
        src="https://tunein.com/embed/player/s8986/?background=dark"
        style="width: 100%; height: 100px"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        title="TuneIn player Radio Mol"
      ></iframe>
    </aside>
  </Teleport>
</template>
