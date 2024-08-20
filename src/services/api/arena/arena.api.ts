import { wait } from '@/helpers/debounce'
import { apiService } from '@/services/api/api.service'

const data: Arena[] = [
  { id: 1, name: 'Arena 1' },
  { id: 2, name: 'Arena 1' },
  { id: 3, name: 'Arena 1' },
  { id: 4, name: 'Arena 1' },
  { id: 5, name: 'Arena 1' }
]

export type Arena = { id: number; name: string }

export async function searchArena(text?: string | null) {
  await wait(800)
  return { data }
}

export function getUser(userId: number) {
  return apiService.get(`/admin/user/${userId}`)
}
