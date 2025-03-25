import type { Prisma } from '@prisma/client'
import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { ArenaDTO, type CreateArenaDTO, UpdateArenaDTO } from './arena.dto'

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

  async getOne(id: number): Promise<ArenaDTO | null> {
    const tournament = await this.prisma.arena.findUnique({
      where: { id }
    })

    return tournament ? plainToInstance(ArenaDTO, tournament) : null
  }

  async update(id: number, data: UpdateArenaDTO): Promise<UpdateArenaDTO> {
    const arena = await this.prisma.arena.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })

    return plainToInstance(UpdateArenaDTO, arena)
  }

  async findAllOptions(where: Prisma.ArenaWhereInput = {}) {
    return this.prisma.arena.findMany({ where, select: { id: true, name: true } })
  }
}
