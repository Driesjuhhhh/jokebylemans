<script setup lang="ts">
import { computed } from 'vue'
import { header, menuItems, withBase, type MenuItem, type MenuPosition } from '../content/site'

const iconPaths: Record<NonNullable<MenuItem['icon']>, string> = {
  Instagram: 'M7.25 2h9.5A5.26 5.26 0 0 1 22 7.25v9.5A5.26 5.26 0 0 1 16.75 22h-9.5A5.26 5.26 0 0 1 2 16.75v-9.5A5.26 5.26 0 0 1 7.25 2Zm0 1.8A3.46 3.46 0 0 0 3.8 7.25v9.5a3.46 3.46 0 0 0 3.45 3.45h9.5a3.46 3.46 0 0 0 3.45-3.45v-9.5a3.46 3.46 0 0 0-3.45-3.45h-9.5Zm4.75 2.55a5.65 5.65 0 1 1 0 11.3 5.65 5.65 0 0 1 0-11.3Zm0 1.8a3.85 3.85 0 1 0 0 7.7 3.85 3.85 0 0 0 0-7.7Zm5.88-.84a1.34 1.34 0 1 1-2.68 0 1.34 1.34 0 0 1 2.68 0Z',
  LinkedIn: 'M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.3 18.5H5.57V10h2.74v8.5Zm-1.37-9.67a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2ZM18.5 18.5h-2.73v-4.13c0-.98-.02-2.24-1.37-2.24-1.37 0-1.58 1.07-1.58 2.17v4.2H10.1V10h2.62v1.16h.04c.36-.7 1.26-1.45 2.6-1.45 2.77 0 3.28 1.83 3.28 4.2v4.59Z',
  'E-mail': 'M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.3 2 7.7 5.2L19.7 7H4.3Zm15.7 1.9-8 5.4-8-5.4V17h16V8.9Z',
  Link: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z',
}

type Zone = { position: MenuPosition; items: MenuItem[]; logo: boolean }

const zones = computed<Zone[]>(() =>
  (['Links', 'Midden', 'Rechts'] as MenuPosition[]).map((position) => ({
    position,
    items: menuItems.filter((item) => item.position === position),
    logo: header.logoPosition === position,
  })),
)

const justify: Record<MenuPosition, string> = {
  Links: 'justify-start',
  Midden: 'justify-center',
  Rechts: 'justify-end',
}

const isExternal = (target: string) => /^(https?:|mailto:|tel:)/.test(target)
const linkAttrs = (item: MenuItem) =>
  item.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : isExternal(item.target) ? { rel: 'noopener noreferrer' } : {}
const mobileClass = (item: MenuItem) => (item.hideOnMobile ? 'hidden md:flex' : 'flex')
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-red-700/20 bg-[#f7ebe2]/92 backdrop-blur">
    <nav class="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-3 md:px-8">
      <div
        v-for="zone in zones"
        v-show="zone.logo || zone.items.length"
        :key="zone.position"
        :class="['flex min-w-0 items-center gap-3 md:gap-4', justify[zone.position], zone.position === 'Midden' ? 'flex-1 overflow-x-auto md:overflow-visible' : zone.position === 'Links' ? 'flex-none' : 'ml-auto flex-none']"
      >
        <a
          v-if="zone.logo"
          :href="header.logoHref"
          class="font-signature text-[clamp(1.6rem,2.4vw,2.5rem)] uppercase leading-none tracking-[0.04em] text-transparent [-webkit-text-stroke:1.7px_#c80f12]"
        >
          <img v-if="header.logoImage" :src="withBase(header.logoImage.src)" :alt="header.logoImageAlt" class="h-9 w-auto md:h-11" />
          <template v-else>
            <span class="md:hidden">{{ header.mobileLogoText }}</span>
            <span class="hidden md:inline">{{ header.logoText }}</span>
          </template>
        </a>

        <template v-for="item in zone.items" :key="item.id">
          <a
            v-if="item.style === 'Icoon'"
            :href="item.target"
            v-bind="linkAttrs(item)"
            :aria-label="item.title"
            :class="[mobileClass(item), 'h-9 w-9 shrink-0 place-items-center justify-center rounded-full border border-red-700/35 text-red-700 transition hover:bg-red-700 hover:text-[#f7ebe2]']"
          >
            <svg viewBox="0 0 24 24" class="h-4.5 w-4.5 fill-current" aria-hidden="true">
              <path :d="iconPaths[item.icon ?? 'Link']" />
            </svg>
          </a>
          <a
            v-else-if="item.style === 'Knop'"
            :href="item.target"
            v-bind="linkAttrs(item)"
            :class="[mobileClass(item), 'shrink-0 items-center whitespace-nowrap rounded-full bg-red-700 px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-[#f7ebe2] transition hover:bg-red-800 md:text-sm']"
          >
            {{ item.title }}
          </a>
          <a
            v-else
            :href="item.target"
            v-bind="linkAttrs(item)"
            :class="[mobileClass(item), 'nav-link min-h-7 shrink-0 items-center whitespace-nowrap py-1 text-[0.72rem] font-semibold uppercase tracking-[0.09em] text-red-700/90 transition md:rounded-sm md:px-3 md:py-1.5 md:text-sm']"
          >
            {{ item.title }}
          </a>
        </template>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
  color: rgb(200 15 18 / 0.9);
  padding-inline: 0.15rem;
  padding-bottom: 0.2rem;
  transition: color 180ms ease;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  right: 50%;
  bottom: 0.05rem;
  height: 1px;
  border-radius: 999px;
  background: #c80f12;
  opacity: 0;
  transition: all 180ms ease;
}

.nav-link:hover {
  color: #c80f12;
}

.nav-link:hover::after {
  left: 0;
  right: 0;
  opacity: 1;
}

.nav-link:focus-visible {
  outline: 2px solid rgba(200, 15, 18, 0.45);
  outline-offset: 2px;
}
</style>
