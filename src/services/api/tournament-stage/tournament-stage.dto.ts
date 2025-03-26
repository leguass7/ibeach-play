import type { ResponseApi } from '@/services/ClientAxios'

import type { TournamentStageDTO } from '~/use-cases/tournament-stage'

export type TournamentStageOptionDto = Pick<TournamentStageDTO, 'id' | 'name'>

export type IResponseTournamentStageOptions = ResponseApi<{ tournaments: TournamentStageOptionDto[] }>

export type IResponseTournamentStage = ResponseApi<{
  tournamentStage: TournamentStageDTO
  tournamentId: number
  tournamentStages: TournamentStageDTO[]
}>
