import type { Prisma } from '@prisma/client'
import { plainToInstance } from 'class-transformer'

import type { PrismaClientSingleton } from '~/database'

import { type UpdateEnrollmentDTO, type CreateEnrollmentDTO, EnrollmentDTO } from './enrollment.dto'

export class EnrollmentRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count(stageId: number) {
    return this.prisma.enrollment.count({ where: { stageId } })
  }

  /** @deprecated somente testes */
  async listAll() {
    const user = await this.prisma.enrollment.findMany({ orderBy: { id: 'asc' } })
    return user?.map(u => plainToInstance(EnrollmentDTO, u))
  }

  async create(data: CreateEnrollmentDTO) {
    return this.prisma.enrollment.create({ data })
  }

  async getOne(id: string): Promise<EnrollmentDTO | null> {
    const tournament = await this.prisma.enrollment.findUnique({
      where: { id }
    })

    return tournament ? plainToInstance(EnrollmentDTO, tournament) : null
  }

  async update(id: string, data: UpdateEnrollmentDTO): Promise<EnrollmentDTO> {
    const arena = await this.prisma.enrollment.update({
      where: { id },
      data: { ...data }
    })

    return plainToInstance(EnrollmentDTO, arena)
  }

  async delete(id: string) {
    return this.prisma.enrollment.delete({ where: { id } })
  }

  async findAllOptions(where: Prisma.EnrollmentWhereInput = {}) {
    return this.prisma.enrollment.findMany({ where, select: { id: true, name: true } })
  }
}
