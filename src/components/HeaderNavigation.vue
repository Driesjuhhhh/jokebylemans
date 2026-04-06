<script setup lang="ts">
const links = [
  { href: '#wie-ben-ik', label: 'Wie ben ik' },
  { href: '#educatie', label: 'Educatie' },
  { href: '#projecten', label: 'Projecten' },
  { href: '#radio-mol', label: 'Radio' },
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-red-700/20 bg-[#f7ebe2]/92 backdrop-blur">
    <nav class="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-3 md:px-8">
      <a
        href="#hero"
        class="font-signature text-[clamp(1.6rem,2.4vw,2.5rem)] uppercase leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:1.7px_#c80f12]"
      >
        Joke Bylemans
      </a>

      <ul class="flex items-center gap-2 md:gap-3">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.09em] text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2] md:text-sm"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
