import type { ResponseApi } from '@/services/ClientAxios'

import type { IPerson } from '../person/person.interface'

export interface IPair {
  id: string
  person1: IPerson
  person2: IPerson
  totalWeight: number
  hasSeeded: boolean
  isBye?: boolean
}

export interface ITournamentPaginatedPairResponse extends ResponseApi {
  pairs: IPair[]
}

export interface ITournamentPairResponse extends ResponseApi {
  pair: IPair | null
}
