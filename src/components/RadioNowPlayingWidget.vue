<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

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
const widgetEl = ref<HTMLElement | null>(null)
const position = ref<{ x: number; y: number } | null>(null)

let refreshTimer: ReturnType<typeof setInterval> | null = null
let isDragging = false
let dragOffsetX = 0
let dragOffsetY = 0
let resizeHandler: (() => void) | null = null

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

function clampPosition(x: number, y: number) {
  const el = widgetEl.value
  const margin = 8
  const width = el?.offsetWidth ?? 320
  const height = el?.offsetHeight ?? 180
  const maxX = Math.max(margin, window.innerWidth - width - margin)
  const maxY = Math.max(margin, window.innerHeight - height - margin)

  return {
    x: Math.min(Math.max(margin, x), maxX),
    y: Math.min(Math.max(margin, y), maxY),
  }
}

function setDefaultPosition() {
  const el = widgetEl.value
  const width = el?.offsetWidth ?? 320
  const height = el?.offsetHeight ?? 180

  const defaultX = window.innerWidth >= 640
    ? window.innerWidth - width - 16
    : (window.innerWidth - width) / 2
  const defaultY = window.innerHeight >= 640
    ? window.innerHeight - height - 16
    : window.innerHeight - height - 12

  position.value = clampPosition(defaultX, defaultY)
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) return

  const target = event.target as HTMLElement | null
  if (target?.closest('button, a, iframe, input')) return

  const card = widgetEl.value
  if (!card) return

  if (!position.value) {
    setDefaultPosition()
  }

  const current = position.value
  if (!current) return

  isDragging = true
  dragOffsetX = event.clientX - current.x
  dragOffsetY = event.clientY - current.y
  card.setPointerCapture(event.pointerId)
}

function onPointerMove(event: PointerEvent) {
  if (!isDragging) return
  position.value = clampPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY)
}

function onPointerUp() {
  isDragging = false
}

const widgetStyle = computed(() => {
  if (!position.value) return undefined
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
  }
})

onMounted(() => {
  updateBrusselsTime()
  refreshTimer = setInterval(updateBrusselsTime, 30_000)
  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)
  resizeHandler = () => {
    if (!shouldRender.value) return
    if (!position.value) {
      setDefaultPosition()
      return
    }
    position.value = clampPosition(position.value.x, position.value.y)
  }
  window.addEventListener('resize', resizeHandler)
})

watch(
  () => props.forceVisible,
  (isVisible) => {
    if (isVisible) {
      isClosed.value = false
    }
  }
)

watch(
  shouldRender,
  async (visible) => {
    if (!visible) return
    if (!position.value) {
      setDefaultPosition()
    }
    await nextTick()
    const current = position.value
    if (!current) return
    position.value = clampPosition(current.x, current.y)
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }

  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
    resizeHandler = null
  }
})
</script>

<template>
  <Teleport to="body">
    <aside
      ref="widgetEl"
      v-if="shouldRender"
      :style="widgetStyle"
      class="fixed z-[70] w-[min(320px,calc(100vw-1.2rem))] cursor-grab rounded-2xl border border-red-700/35 bg-[#f9ede4]/98 p-2.5 shadow-[0_18px_34px_rgba(0,0,0,0.24)] backdrop-blur active:cursor-grabbing sm:w-[min(360px,calc(100vw-2rem))] sm:p-3"
      @pointerdown="onPointerDown"
    >
      <div class="mb-2 flex items-center justify-between gap-3">
        <p class="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-red-700/75">Radio Mol</p>
        <button
          type="button"
          class="inline-flex items-center rounded-full border border-red-700/35 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-red-700/80 transition hover:border-red-700 hover:bg-red-700 hover:text-[#f9ede4]"
          @click="closePlayer"
        >
          Sluiten
        </button>
      </div>

      <iframe
        src="https://tunein.com/embed/player/s8986/?background=dark"
        class="h-[74px] w-full sm:h-[100px]"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        title="TuneIn player Radio Mol"
      ></iframe>
    </aside>
  </Teleport>
</template>
