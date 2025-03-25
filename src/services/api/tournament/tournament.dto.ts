import type { ResponseApi } from '@/services/ClientAxios'

import type { TournamentDTO } from '~/use-cases/tournament'

export type TournamentOptionDto = Pick<TournamentDTO, 'id' | 'name'>

export type IResponseTournamentOptions = ResponseApi<{ tournaments: TournamentOptionDto[] }>

export type IResponseTournament = ResponseApi<{ tournament: TournamentDTO; tournamentId: number; tournaments: TournamentDTO[] }>
