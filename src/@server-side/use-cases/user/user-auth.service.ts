import type { UserRepository } from './user.repository'
import { compareSync } from 'bcrypt'

export type AuthorizedUser = {
  id?: number
  email?: string
  image?: string | null
  name?: string | null
}

export class UserAuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async checkCredentials(email = '', password = '') {
    const user = await this.userRepository.findUserByEmail(email.toLowerCase().trim())
    if (!user) return null

    const result: AuthorizedUser = {
      id: user.id,
      email: user.email,
      image: user.image,
      name: user.name
    }
    return compareSync(password, `${user?.password}`) ? result : null
  }
}
