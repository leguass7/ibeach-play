import prisma from '~/database'

import { ClassroomRepository } from './classroom.repository'
import { ClassroomService } from './classroom.service'
export * from './classroom.dto'

const classroomRepository = new ClassroomRepository(prisma)
const classroomService = new ClassroomService(classroomRepository)

export { classroomService, classroomRepository }
export type { ClassroomRepository, ClassroomService }
