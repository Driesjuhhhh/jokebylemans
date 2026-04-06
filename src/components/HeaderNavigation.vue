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
    <nav class="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-3 px-4 py-3 md:px-8">
      <a
        href="#hero"
        class="font-signature text-[clamp(1.6rem,2.4vw,2.5rem)] uppercase leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:1.7px_#c80f12]"
      >
        <span>Joke</span><span class="hidden md:inline"> Bylemans</span>
      </a>

      <ul class="order-2 ml-auto flex min-w-0 items-center justify-end gap-3 overflow-x-auto md:order-2 md:ml-0 md:gap-2 md:overflow-visible">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block whitespace-nowrap px-0 py-0 text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-red-700/90 transition hover:text-red-900 md:px-3 md:py-1.5 md:text-sm md:hover:bg-red-700 md:hover:text-[#f7ebe2]"
          >
            {{ link.label }}
          </a>
        </li>
      </ul>

      <ul class="order-2 ml-auto hidden items-center gap-2 md:order-3 md:ml-0 md:flex">
        <li>
          <a
            href="https://www.instagram.com/blokkemetjokke/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            class="grid h-9 w-9 place-items-center rounded-full border border-red-700/35 text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2]"
          >
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current" aria-hidden="true">
              <path
                d="M7.25 2h9.5A5.26 5.26 0 0 1 22 7.25v9.5A5.26 5.26 0 0 1 16.75 22h-9.5A5.26 5.26 0 0 1 2 16.75v-9.5A5.26 5.26 0 0 1 7.25 2Zm0 1.8A3.46 3.46 0 0 0 3.8 7.25v9.5a3.46 3.46 0 0 0 3.45 3.45h9.5a3.46 3.46 0 0 0 3.45-3.45v-9.5a3.46 3.46 0 0 0-3.45-3.45h-9.5Zm4.75 2.55a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.8a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5.88-.84a1.34 1.34 0 1 1-2.68 0 1.34 1.34 0 0 1 2.68 0Z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/joke-bylemans-04088025b/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="grid h-9 w-9 place-items-center rounded-full border border-red-700/35 text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2]"
          >
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current" aria-hidden="true">
              <path
                d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.3 18.5H5.57V10h2.74v8.5Zm-1.37-9.67a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM18.5 18.5h-2.73v-4.13c0-.98-.02-2.24-1.37-2.24-1.37 0-1.58 1.07-1.58 2.17v4.2H10.1V10h2.62v1.16h.04c.36-.7 1.26-1.45 2.6-1.45 2.77 0 3.28 1.83 3.28 4.2v4.59Z"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>
