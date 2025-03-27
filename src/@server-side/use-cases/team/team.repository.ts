import type { Prisma } from '@prisma/client'
import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { type UpdateTeamDTO, type CreateTeamDTO, TeamDTO } from './team.dto'

export class TeamRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count(stageId: number) {
    return this.prisma.team.count({ where: { stageId } })
  }

  /** @deprecated somente testes */
  async listAll() {
    const user = await this.prisma.team.findMany({ orderBy: { id: 'asc' } })
    return user?.map(u => plainToInstance(TeamDTO, u))
  }

  async create(data: CreateTeamDTO) {
    return this.prisma.team.create({ data })
  }

  async getOne(id: string): Promise<TeamDTO | null> {
    const tournament = await this.prisma.team.findUnique({
      where: { id }
    })

    return tournament ? plainToInstance(TeamDTO, tournament) : null
  }

  async update(id: string, data: UpdateTeamDTO): Promise<TeamDTO> {
    const team = await this.prisma.team.update({
      where: { id },
      data: { ...data }
    })

    return plainToInstance(TeamDTO, team)
  }

  async delete(id: string) {
    return this.prisma.team.delete({ where: { id } })
  }

  async findAllOptions(where: Prisma.TeamWhereInput = {}) {
    return this.prisma.team.findMany({ where, select: { id: true, stageId: true } })
  }
}
