import type { ArenaDTO } from '@/@server-side/use-cases/arena'
import type { ResponseApi } from '@/services/ClientAxios'

export type ArenaOptionDto = Pick<ArenaDTO, 'id' | 'name'>

export type IResponseArenaOptions = ResponseApi<{ arenas: ArenaOptionDto[] }>
