import type { PrismaClientSingleton } from '~/database'

import type { CreateClassroomDTO, UpdateClassroomDTO } from './classroom.dto'
import { hoursDto } from './classroom.helper'

export class ClassroomRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async getOne(id: number) {
    return this.prisma.classroom.findUnique({
      where: { id },
      include: {
        hours: {
          orderBy: {
            weekDay: 'asc'
          },
          select: {
            id: true,
            weekDay: true,
            startHour: true,
            classroomId: true
          }
        },
        arena: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
  }

  async create(data: CreateClassroomDTO) {
    const { hours, ...classroomData } = data

    return this.prisma.classroom.create({
      data: { ...classroomData, hours: { create: hoursDto(hours) } },
      include: { hours: true }
    })
  }

  async update(id: number, data: UpdateClassroomDTO) {
    const { hours, ...classroomData } = data
    const hasHours = !!(hours && hours?.length > 0)

    if (hasHours) {
      await this.prisma.classroomHours.deleteMany({ where: { classroomId: id } })
    }
    const newHours = hasHours ? hoursDto(hours) : []
    const hoursData = hasHours ? { hours: { create: newHours } } : {}

    return this.prisma.classroom.update({
      where: { id },
      data: { ...classroomData, ...hoursData },
      include: { hours: !!hasHours }
    })
  }

  async findAll(coachId: number, arenaId?: number) {
    return this.prisma.classroom.findMany({
      where: { coachId, ...(arenaId && { arenaId }) },
      include: {
        hours: true,
        arena: { select: { name: true, address: true } },
        students: {
          include: { student: { select: { name: true, email: true, phone: true } } }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
  }
}
