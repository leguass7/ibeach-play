import prisma from '@/@server-side/database'
import { SessionRepository } from './session.repository'
export * from './session.dto'
export type { SessionRepository }

const sessionRepository = new SessionRepository(prisma)

export { sessionRepository }
