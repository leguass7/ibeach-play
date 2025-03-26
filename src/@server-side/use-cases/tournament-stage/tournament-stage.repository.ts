import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { type CreateTournamentStageDTO, TournamentStageDTO, type UpdateTournamentStageDTO } from './tournament-stage.dto'

export class TournamentStageRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count(tournamentId?: number): Promise<number> {
    const where = !!tournamentId ? { tournamentId } : undefined
    return this.prisma.tournamentStage.count({ where })
  }

  async create(data: CreateTournamentStageDTO): Promise<TournamentStageDTO> {
    const tournament = await this.prisma.tournamentStage.create({ data: { ...data, createdAt: new Date() } })

    return plainToInstance(TournamentStageDTO, tournament)
  }

  async update(id: number, data: UpdateTournamentStageDTO): Promise<TournamentStageDTO> {
    const tournament = await this.prisma.tournamentStage.update({
      where: { id },
      data: { ...data, updatedAt: new Date() }
    })

    return plainToInstance(TournamentStageDTO, tournament)
  }

  async delete(id: number): Promise<void> {
    await this.prisma.tournamentStage.delete({ where: { id } })
  }

  async getOne(id: number): Promise<TournamentStageDTO | null> {
    const tournament = await this.prisma.tournamentStage.findUnique({ where: { id } })
    return tournament ? plainToInstance(TournamentStageDTO, tournament) : null
  }

  async listAll(tournamentId?: number | null): Promise<TournamentStageDTO[]> {
    const where = !!tournamentId ? { tournamentId } : undefined
    const tournamentStages = await this.prisma.tournamentStage.findMany({ orderBy: { createdAt: 'desc' }, where })
    return plainToInstance(TournamentStageDTO, tournamentStages)
  }
}
