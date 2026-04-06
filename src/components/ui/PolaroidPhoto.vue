<script setup lang="ts">
defineProps<{
  src: string
  alt: string
  rotateClass?: string
  wrapperClass?: string
  imageClass?: string
}>()
</script>

<template>
  <figure
    :class="[
      'border border-neutral-300 rounded-xl bg-white p-3 shadow-[0_18px_35px_rgba(0,0,0,0.18)] transition duration-500 hover:-translate-y-1 hover:rotate-0',
      rotateClass,
      wrapperClass,
      'animate-float'
    ]"
  >
    <img :src="src" :alt="alt" :class="['h-full w-full object-cover', imageClass]" />
  </figure>
</template>
