import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { type CreateTournamentDTO, TournamentDTO, type UpdateTournamentDTO } from './tournament.dto'

export class TournamentRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count() {
    return this.prisma.tournament.count()
  }

  async create(data: CreateTournamentDTO): Promise<TournamentDTO> {
    const tournament = await this.prisma.tournament.create({
      data: {
        ...data
      }
    })

    return plainToInstance(TournamentDTO, tournament)
  }

  async update(id: number, data: UpdateTournamentDTO): Promise<TournamentDTO> {
    const tournament = await this.prisma.tournament.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })

    return plainToInstance(TournamentDTO, tournament)
  }

  async delete(id: number): Promise<void> {
    await this.prisma.tournament.delete({
      where: { id }
    })
  }

  async getOne(id: number): Promise<TournamentDTO | null> {
    const tournament = await this.prisma.tournament.findUnique({
      where: { id }
    })

    return tournament ? plainToInstance(TournamentDTO, tournament) : null
  }

  async listAll(): Promise<TournamentDTO[]> {
    const tournaments = await this.prisma.tournament.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return plainToInstance(TournamentDTO, tournaments)
  }
}
