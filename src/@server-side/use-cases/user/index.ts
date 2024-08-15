import prisma from '~/database'

import { UserAuthService } from './user-auth.service'
import { UserRepository } from './user.repository'
export * from './user.dto'
export * from './user.helper'

const userRepository = new UserRepository(prisma)
const userAuthService = new UserAuthService(userRepository)

export { userRepository, userAuthService }
export type { UserRepository, UserAuthService }
