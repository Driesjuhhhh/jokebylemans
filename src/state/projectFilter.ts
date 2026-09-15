import { ref } from 'vue'

export type ProjectCategory =
  | 'Presentatie'
  | 'Voice-over'
  | 'Multicamera'
  | 'Content Creation'

// Geen actieve categorie betekent dat standaard alle projecten zichtbaar zijn.
export const projectFilters = ref<ProjectCategory[]>([])
