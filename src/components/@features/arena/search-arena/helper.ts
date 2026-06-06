import type { SummaryArena } from '@/services/api/arena/arena.api'
import type { RecentItem } from '@/store/reducers/recent'

export function arenaToRecentItemDto(arena: SummaryArena): RecentItem
export function arenaToRecentItemDto(arena: SummaryArena[]): RecentItem[]
export function arenaToRecentItemDto(arena: unknown): unknown {
  if (Array.isArray(arena)) return arena.map(d => arenaToRecentItemDto(d)) as RecentItem[]

  const { description, id, name } = (arena || {}) as SummaryArena
  return { id, name, description } as RecentItem
}
