import prisma from '~/database'

import { StudentRepository } from './student.repository'
export * from './student.dto'

const studentRepository = new StudentRepository(prisma)

export { studentRepository }
export type { StudentRepository }
