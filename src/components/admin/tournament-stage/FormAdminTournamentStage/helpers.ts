import type { TournamentStageDTO } from '@/@server-side/use-cases/tournament-stage'
import type { StoreTournamentStageParams } from '@/services/api/admin/tournament-stage/admin-tournament-stage.api'
import type { FormTournamentStageData } from '@/services/api/tournament-stage'

export function formTournamentStageOutDto(data: FormTournamentStageData, tournamentStageId?: number): StoreTournamentStageParams {
  const id = tournamentStageId && tournamentStageId > 0 ? tournamentStageId : data?.id
  return {
    ...data,
    id,
    name: data.name,
    arenaId: +data?.arenaId
  }
}

export function formTournamentStageInDto(data?: TournamentStageDTO): FormTournamentStageData | undefined {
  if (!data) return undefined
  const { id, name } = data

  return {
    ...data,
    id,
    name: name || '',
    arenaId: Number(data.arenaId)
  } as FormTournamentStageData
}
