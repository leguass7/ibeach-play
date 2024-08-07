import type { Prisma, PrismaClient, User } from '@prisma/client'
import type { UpdateUserDTO, CreateUserDTO, UserDTO } from './user.dto'
import type { AdapterUser } from 'next-auth/adapters'
import { tryInteger } from '@/helpers/number'

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createAdapterUser({ id, ...data }: AdapterUser) {
    const userId = tryInteger(id)
    console.log('UserRepository createAdapterUser', { userId, data })
    const toSave = userId ? { ...data, id: userId } : data
    const user = await this.create(toSave as CreateUserDTO)
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    console.log('UserRepository create', { data })

    const user = await this.prisma.user.create({ data })
    return user
  }

  async findUserById(id: number | string) {
    const userId = typeof id === 'string' ? +id || null : id
    if (!userId) return null
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { accessGroups: true } })
    return user
  }

  async findUserByEmail(email: string) {
    console.log('UserRepository findUserByEmail', email)
    const user = await this.prisma.user.findFirst({ where: { email }, include: { accounts: true } })
    return user
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({ where: { id }, data })
    return user
  }

  async remove(userId: number | string) {
    const id = +userId || null
    if (!id) return null
    const deleted = await this.prisma.user.delete({ where: { id } })
    return deleted
  }
}
