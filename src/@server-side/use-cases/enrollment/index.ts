import prisma from '~/database'

import { EnrollmentRepository } from './enrollment.repository'
export * from './enrollment.dto'

const enrollmentRepository = new EnrollmentRepository(prisma)

export { enrollmentRepository }
