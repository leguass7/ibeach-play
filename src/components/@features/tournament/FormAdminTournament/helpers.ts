import type { StoreArenaParams } from '@/services/api/admin/arena/admin-arena.api'
import type { FormArenaData } from '@/services/api/arena'
import type { FormTournamentData } from '@/services/api/tournament'

import type { TournamentDTO } from '~/use-cases/tournament'

export function formTournamentOutDto(data: FormArenaData, arenaId?: number): StoreArenaParams {
  const id = arenaId && arenaId > 0 ? arenaId : data?.id
  return {
    id,
    name: data.name
  }
}

export function formTournamentInDto(data?: TournamentDTO): FormTournamentData | undefined {
  if (!data) return undefined
  const { id, name } = data

  return {
    id,
    name: name || ''
  } as FormTournamentData
}
