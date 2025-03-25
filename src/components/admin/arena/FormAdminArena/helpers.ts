import type { ArenaDTO } from '@/@server-side/use-cases/arena'
import type { StoreArenaParams } from '@/services/api/admin/arena/admin-arena.api'
import type { FormArenaData } from '@/services/api/arena'

export function formArenaOutDto(data: FormArenaData, arenaId?: number): StoreArenaParams {
  const id = arenaId && arenaId > 0 ? arenaId : data?.id
  return {
    id,
    name: data.name
  }
}

export function formArenaInDto(data?: ArenaDTO): FormArenaData | undefined {
  if (!data) return undefined
  const { id, name } = data

  return {
    id,
    name: name || ''
  } as FormArenaData
}
