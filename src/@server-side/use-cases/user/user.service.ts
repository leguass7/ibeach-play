import type { UserRepository } from './user.repository'

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getOne(id: number | string) {
    const user = await this.userRepository.findUserById(id)
    return user
  }
}
