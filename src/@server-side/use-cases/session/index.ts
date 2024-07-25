import prisma from '~/database'
import { SessionRepository } from './session.repository'
export * from './session.dto'
export * from './session.helper'
export type { SessionRepository }

const sessionRepository = new SessionRepository(prisma)

export { sessionRepository }
