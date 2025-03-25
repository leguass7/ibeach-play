import type { ResponseApi } from '@/services/ClientAxios'

import type { IPair } from '../pair/pair.interface'

export interface IBracketMatch {
  id: string
  team1: IPair | null
  team2: IPair | null
  winner: IPair | null
  score1: number | null
  score2: number | null
  previousMatches?: IBracketMatch[]
}

export interface IBracketRound {
  name: string
  matches: IBracketMatch[]
}

export interface ITournamentPaginatedBracketRoundResponse extends ResponseApi {
  rounds: IBracketRound[]
}
