import type { PrismaClientSingleton } from '~/database'

import type { CreateClassroomDTO } from './classroom.dto'

export class ClassroomRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async create(data: CreateClassroomDTO) {
    return this.prisma.classroom.create({ data })
  }
}
