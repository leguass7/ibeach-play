import prisma from '~/database'

import { ArenaRepository } from './arena.repository'
export * from './arena.dto'

const arenaRepository = new ArenaRepository(prisma)

export { arenaRepository }
export type { ArenaRepository }
