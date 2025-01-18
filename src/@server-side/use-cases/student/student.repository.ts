import type { PrismaClientSingleton } from '~/database'

import type { CreateStudentDTO } from './student.dto'

export class StudentRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async count(filters?: { classroomId?: number; arenaId?: number }) {
    const where = filters
      ? {
          ...(filters?.classroomId && { classroomId: filters?.classroomId }),
          ...(filters?.arenaId && {
            classroom: { arenaId: filters.arenaId }
          })
        }
      : {}

    return this.prisma.student.count({ where })
  }

  async getOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
      include: {
        student: {
          select: { id: true, name: true, email: true, phone: true }
        },
        classroom: {
          select: {
            id: true,
            label: true,
            arena: { select: { id: true, name: true } }
          }
        }
      }
    })
  }

  async create(data: CreateStudentDTO) {
    return this.prisma.student.create({
      data,
      include: {
        student: {
          select: { name: true, email: true, phone: true }
        }
      }
    })
  }

  async delete(id: string) {
    return this.prisma.student.delete({ where: { id } })
  }

  async findAll(classroomId: number) {
    return this.prisma.student.findMany({
      where: { classroomId },
      include: {
        student: {
          select: { name: true, email: true, phone: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}
