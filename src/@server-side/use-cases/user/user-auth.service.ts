import type { User } from '@prisma/client'
import type { UserRepository } from './user.repository'
import { compareSync } from 'bcrypt'
import type { DefaultUser } from 'next-auth'

export type AuthorizedUser = DefaultUser & {
  // id?: number
  // email?: string
  // image?: string | null
  // name?: string | null
}

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkCredentials(email = '', password = '') {
    const user = await this.userRepository.findUserByEmail(email.toLowerCase().trim())
    if (!user) return null

    const result: AuthorizedUser = {
      id: `${user?.id}`,
      email: user.email,
      image: user.image,
      name: user.name
    }

    return compareSync(password, `${user?.password}`) ? result : null
  }

  async getUserCredentials(id?: string | number) {
    if (!id) return null

    const user = await this.userRepository.findUserById(id)
    if (!user) return null

    const data = { id: user?.id, email: user?.email, image: user?.image, name: user?.name }
    await this.userRepository.update(user.id, { lastAcess: new Date() })
    return { ...user, ...data }
  }
}
