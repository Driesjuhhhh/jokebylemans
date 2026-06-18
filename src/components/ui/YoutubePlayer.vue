<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps<{
  videoId: string
  muted: boolean
  volume: number
}>()

const containerId = `yt-player-${Math.random().toString(36).slice(2)}`
let player: any = null
let isDestroyed = false

function loadYouTubeApi(): Promise<any> {
  const w = window as any

  if (w.YT && w.YT.Player) {
    return Promise.resolve(w.YT)
  }

  return new Promise((resolve) => {
    const previousCallback = w.onYouTubeIframeAPIReady
    w.onYouTubeIframeAPIReady = () => {
      previousCallback?.()
      resolve(w.YT)
    }

    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(tag)
    }
  })
}

function syncPlayerState() {
  if (!player?.mute) return

  if (props.muted) {
    player.mute()
  } else {
    player.unMute()
    player.setVolume(Math.round(props.volume * 100))
  }
}

onMounted(async () => {
  const YT = await loadYouTubeApi()
  if (isDestroyed) return

  player = new YT.Player(containerId, {
    videoId: props.videoId,
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
      loop: 1,
      playlist: props.videoId,
    },
    events: {
      onReady: syncPlayerState,
    },
  })
})

onBeforeUnmount(() => {
  isDestroyed = true
  player?.destroy?.()
  player = null
})

watch(() => [props.muted, props.volume], syncPlayerState)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <div :id="containerId" class="absolute inset-0"></div>
  </div>
</template>

<style scoped>
:deep(iframe) {
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
}
</style>
