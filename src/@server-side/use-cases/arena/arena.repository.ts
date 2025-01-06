import type { Prisma } from '@prisma/client'

import type { PrismaClientSingleton } from '~/database'

import type { CreateArenaDTO } from './arena.dto'

export class ArenaRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async create(data: CreateArenaDTO) {
    return this.prisma.arena.create({ data })
  }

  async findAllOptions(where: Prisma.ArenaWhereInput = {}) {
    return this.prisma.arena.findMany({ where, select: { id: true, name: true } })
  }
}
