import type { Prisma } from '@prisma/client'
import { plainToInstance } from 'class-transformer'
import type { AdapterUser } from 'next-auth/adapters'

import type { PrismaClientSingleton } from '~/database'

import { type CreateUserDTO, type UserDTO, UserResponseDTO } from './user.dto'
import { userToAdapterUser } from './user.helper'

export class UserRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async createAdapterUser({ id: _, ...data }: AdapterUser) {
    const email = data?.email as string
    if (email) {
      const userExists = await this.findUserByEmail(email?.toLowerCase?.()?.trim?.())
      if (userExists) {
        userExists.lastAccess = new Date()
        await this.update(userExists.id, { lastAccess: userExists.lastAccess })
        return userToAdapterUser(userExists) as AdapterUser
      }
    }

    const user = await this.create(data as CreateUserDTO)
    return userToAdapterUser(user) as AdapterUser
  }

  async create(data: Prisma.UserCreateInput): Promise<UserDTO> {
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

  /** @deprecated somente testes */
  async listAll() {
    const user = await this.prisma.user.findMany({ orderBy: { id: 'asc' }, include: { accessGroups: true } })
    return user?.map(u => plainToInstance(UserResponseDTO, u))
  }

  async getOne(id: number | string) {
    const userId = typeof id === 'string' ? +id || null : id
    if (!userId) return null
    const user = await this.prisma.user.findUnique({ where: { id: userId }, include: { accessGroups: true } })
    return plainToInstance(UserResponseDTO, user)
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
