import { ref } from 'vue'

export type ProjectCategory = 'Alles' | 'PXL' | 'Thomas More' | 'Extern'

export const projectFilter = ref<ProjectCategory>('Alles')
