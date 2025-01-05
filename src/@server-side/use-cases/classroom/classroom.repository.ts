import type { PrismaClientSingleton } from '~/database'

import type { CreateClassroomDTO, UpdateClassroomDTO } from './classroom.dto'

export class ClassroomRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async create(data: CreateClassroomDTO) {
    const { hours, ...classroomData } = data

    return this.prisma.classroom.create({
      data: {
        ...classroomData,
        hours: { create: hours }
      },
      include: { hours: true }
    })
  }

  async update(id: number, data: UpdateClassroomDTO) {
    const { hours, ...classroomData } = data

    if (hours) {
      await this.prisma.classroomHours.deleteMany({ where: { classroomId: id } })
    }

    return this.prisma.classroom.update({
      where: { id },
      data: {
        ...classroomData,
        ...(hours && { hours: { create: hours } })
      },
      include: { hours: true }
    })
  }

  async findAll(coachId: number, arenaId?: number) {
    return this.prisma.classroom.findMany({
      where: { coachId, ...(arenaId && { arenaId }) },
      include: {
        hours: true,
        arena: { select: { name: true, address: true } },
        students: {
          include: {
            student: {
              select: { name: true, email: true, phone: true }
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}
