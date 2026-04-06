<script setup lang="ts">
defineProps<{
  sectionClass?: string
  aos?: string
  aosDelay?: number
}>()
</script>

<template>
  <section
    :class="[
      'mx-auto min-h-[88svh] w-full max-w-[1440px] snap-start scroll-mt-24 px-4 pb-6 pt-20 md:px-10 md:pb-10 md:pt-24',
      sectionClass
    ]"
  >
    <div
      :data-aos="aos ?? 'fade-up'"
      :data-aos-delay="aosDelay ?? 0"
      class="w-full"
    >
      <slot />
    </div>
  </section>
</template>
