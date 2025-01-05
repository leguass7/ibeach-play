import prisma from '~/database'

import { ClassroomRepository } from './classroom.repository'
import { ClassroomService } from './classroom.service'
export * from './classroom.dto'

const arenaRepository = new ClassroomRepository(prisma)
const arenaService = new ClassroomService(arenaRepository)

export { arenaRepository, arenaService }
export type { ClassroomRepository, ClassroomService }
