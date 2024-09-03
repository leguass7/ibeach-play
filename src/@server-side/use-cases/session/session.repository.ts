import type { Prisma } from '@prisma/client'
import type { AdapterSession } from 'next-auth/adapters'

import type { PrismaClientSingleton } from '~/database'

import type { SessionAndUserDTO } from './session.dto'

export class SessionRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async getOneAndUser(sessionToken: string): Promise<SessionAndUserDTO | null> {
    const result = await this.prisma.session.findFirst({ where: { sessionToken }, include: { user: true } })
    return result as SessionAndUserDTO
  }

  async getOne(sessionToken: string) {
    const result = await this.prisma.session.findFirst({ where: { sessionToken } })
    return result
  }

  async create({ expires, sessionToken, userId }: AdapterSession) {
    const id = +userId || null
    if (!id) return null
    const result = await this.prisma.session.create({ data: { expires, sessionToken, userId: id } })
    return result
  }

  async update(sessionToken: string, data: Prisma.SessionUpdateInput) {
    const user = await this.prisma.session.update({ where: { sessionToken }, data })
    return user
  }

  async remove(sessionToken: string) {
    if (sessionToken) return null
    const deleted = await this.prisma.session.delete({ where: { sessionToken } })
    return deleted
  }
}
