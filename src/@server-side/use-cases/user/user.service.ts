import { generateHashPassword } from '@/helpers/hash'

import type { UserRepository } from './user.repository'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getOne(id: number | string) {
    const user = await this.userRepository.findUserById(id)
    return user
  }

  async chagePassword(id: number, newPassword: string) {
    const hash = await generateHashPassword(newPassword)
    const updated = await this.userRepository.update(id, { password: hash })
    return updated
  }
}
