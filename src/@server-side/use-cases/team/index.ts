import prisma from '~/database'

import { TeamRepository } from './team.repository'
export * from './team.dto'

const enrollmentRepository = new TeamRepository(prisma)

export { enrollmentRepository }
