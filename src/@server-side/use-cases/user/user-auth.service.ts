import type { User } from '@prisma/client'
import { compareSync } from 'bcrypt'
import type { Awaitable, DefaultUser } from 'next-auth'

import type { UserRepository } from './user.repository'

export type AuthorizedUser = DefaultUser & {
  // id?: number
  // email?: string
  // image?: string | null
  // name?: string | null
}

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkCredentials(email = '', password = ''): Promise<Awaitable<User | null>> {
    const user = await this.userRepository.findUserByEmail(email.toLowerCase().trim())
    if (!user) return null
    return compareSync(password, `${user?.password}`) ? user : null
  }

  async getUserCredentials(id?: string | number) {
    if (!id) return null

    const user = await this.userRepository.findUserById(id)
    if (!user) return null

    const data = { id: user?.id, email: user?.email, image: user?.image, name: user?.name }
    await this.userRepository.update(user.id, { lastAccess: new Date() })
    return { ...user, ...data }
  }
}
