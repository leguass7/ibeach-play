import type { TeamDTO } from '@/@server-side/use-cases/team'
import type { ResponseApi } from '@/services/ClientAxios'

export type TeamOptionDto = Pick<TeamDTO, 'id' | 'stageId'>

export type ITeamResponse = ResponseApi<{ team: TeamDTO; arenaId: number; teams: TeamDTO[] }>
