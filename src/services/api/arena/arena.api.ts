import { wait } from '@/helpers/debounce'
import { apiService } from '@/services/api/api.service'
import type { Arena } from '@prisma/client'

const description = `lore ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
   tempor incididunt ut labore et dolore magna aliqua ut enim ad minim
   veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo
   consequat duis aute irure dolor in reprehenderit voluptate velit esse cillum dolore
   fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui
   officia deserunt mollit anim id est laborum`

export type SummaryArena = Pick<Arena, 'id' | 'name' | 'description'>

const data: SummaryArena[] = [
  { id: 1, name: 'Arena 1', description },
  { id: 2, name: 'Arena 2', description },
  { id: 3, name: 'Arena 3', description },
  { id: 4, name: 'Arena 4', description },
  { id: 5, name: 'Arena 5', description }
]

export async function searchArena(_text?: string | null) {
  await wait(500)
  return { data }
}

export function getUser(userId: number) {
  return apiService.get(`/admin/user/${userId}`)
}
