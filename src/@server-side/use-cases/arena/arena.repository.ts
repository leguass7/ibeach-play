import type { PrismaClientSingleton } from '~/database'

import type { CreateArenaDTO } from './arena.dto'

export class ArenaRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async create(data: CreateArenaDTO) {
    return this.prisma.arena.create({ data })
  }
}
