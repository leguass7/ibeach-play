import type { CreateClassroomDTO, UpdateClassroomDTO } from './classroom.dto'
import type { ClassroomRepository } from './classroom.repository'

/** @deprecated */
export class ClassroomService {
  constructor(private readonly classroomRepository: ClassroomRepository) {}

  getRepository() {
    return this.classroomRepository
  }

  async getOne(id: number) {
    return this.classroomRepository.getOne(id)
  }

  async create(data: CreateClassroomDTO) {
    return this.classroomRepository.create(data)
  }

  async update(id: number, data: UpdateClassroomDTO) {
    return this.classroomRepository.update(id, data)
  }

  async list(coachId: number, arenaId?: number) {
    return this.classroomRepository.findAll(coachId, arenaId)
  }
}
