import type { Prisma } from '@prisma/client'
import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { ArenaDTO, type CreateArenaDTO } from './arena.dto'

export class ArenaRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count() {
    return this.prisma.arena.count()
  }

  /** @deprecated somente testes */
  async listAll() {
    const user = await this.prisma.arena.findMany({ orderBy: { id: 'asc' } })
    return user?.map(u => plainToInstance(ArenaDTO, u))
  }

  async create(data: CreateArenaDTO) {
    return this.prisma.arena.create({ data })
  }

  async findAllOptions(where: Prisma.ArenaWhereInput = {}) {
    return this.prisma.arena.findMany({ where, select: { id: true, name: true } })
  }
}
