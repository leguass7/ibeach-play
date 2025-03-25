import type { ResponseApi } from '@/services/ClientAxios'

import type { ArenaDTO } from '~/use-cases/arena'

export type ArenaOptionDto = Pick<ArenaDTO, 'id' | 'name'>

export type IResponseArenaOptions = ResponseApi<{ arenas: ArenaOptionDto[] }>

export type IResponseArena = ResponseApi<{ arena: ArenaDTO; arenaId: number; arenas: ArenaDTO[] }>
