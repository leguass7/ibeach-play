import prisma from '~/database'

import { UserAuthService } from './user-auth.service'
import { UserRepository } from './user.repository'
import { UserService } from './user.service'
export * from './user.dto'
export * from './user.helper'

const userRepository = new UserRepository(prisma)
const userAuthService = new UserAuthService(userRepository)
const userService = new UserService(userRepository)

export { userRepository, userAuthService, userService }
export type { UserRepository, UserAuthService, UserService }
