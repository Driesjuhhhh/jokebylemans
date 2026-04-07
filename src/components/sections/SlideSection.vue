<script setup lang="ts">
defineProps<{
  sectionClass?: string
  aos?: string | false
  aosDelay?: number
}>()
</script>

<template>
  <section
    :class="[
      'mx-auto min-h-[84svh] w-full max-w-[1440px] snap-start scroll-mt-24 px-4 pb-6 pt-24 md:min-h-[88svh] md:px-10 md:pb-10 md:pt-24',
      sectionClass
    ]"
  >
    <div
      :data-aos="aos === false ? undefined : (aos ?? 'fade-up')"
      :data-aos-delay="aos === false ? undefined : (aosDelay ?? 0)"
      class="w-full"
    >
      <slot />
    </div>
  </section>
</template>
