import type { Options, FetchHandler, ItemOption, LoadedHandler } from '@ui/select-fetcher'
import type { ArenaOptionDto } from '@/services/api/arena'

export type { Options, FetchHandler, ItemOption, LoadedHandler }
export function arenaToOptionsDto(arena: ArenaOptionDto[] = []): Options {
  return Array.isArray(arena) ? arena?.map?.(({ id, name }) => ({ value: id, label: name })) : []
}
