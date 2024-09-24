import prisma from '~/database'

import { ArenaRepository } from './arena.repository'
import { ArenaService } from './arena.service'
export * from './arena.dto'

const arenaRepository = new ArenaRepository(prisma)
const arenaService = new ArenaService(arenaRepository)

export { arenaRepository, arenaService }
export type { ArenaRepository, ArenaService }
