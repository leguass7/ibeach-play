import type { PrismaClient } from '@prisma/client'
import type { UpdateUserDTO, CreateUserDTO, UserDTO } from './user.dto'

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(data: CreateUserDTO) {
    const user = await this.prisma.user.create({ data })
    return user
  }

  async findUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    return user
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    const user = await this.prisma.user.findFirst({ where: { email } })
    return user
  }

  async updateUser(id: number, data: UpdateUserDTO) {
    const user = await this.prisma.user.update({ where: { id }, data })
    return user
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.delete({ where: { id } })
    return user
  }
}
