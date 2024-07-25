import prisma from '~/database'
import { VerificationTokenRepository } from './verification-token.repository'
export * from './verification-token.dto'

export type { VerificationTokenRepository }

const verificationTokenRepository = new VerificationTokenRepository(prisma)

export { verificationTokenRepository }
