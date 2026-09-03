import { ref } from 'vue'

export type ProjectCategory =
  | 'Presentatie'
  | 'Voice-over'
  | 'Multicamera'
  | 'Content Creation'

export const projectFilters = ref<ProjectCategory[]>([])
