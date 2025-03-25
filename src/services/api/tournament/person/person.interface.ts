import type { ResponseApi } from '@/services/ClientAxios'

export interface IPerson {
  id: string
  name: string
  weight: number
  isSeeded: boolean
}

export interface ITournamentPaginatedPersonResponse extends ResponseApi {
  persons: IPerson[]
}

export interface ITournamentPersonResponse extends ResponseApi {
  person: IPerson | null
}
