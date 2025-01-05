import type { CreateClassroomDTO, UpdateClassroomDTO } from './classroom.dto'
import type { ClassroomRepository } from './classroom.repository'

export class ClassroomService {
  constructor(private readonly classroomRepository: ClassroomRepository) {}

  async createClassroom(data: CreateClassroomDTO) {
    return this.classroomRepository.create(data)
  }

  async updateClassroom(id: number, data: UpdateClassroomDTO) {
    return this.classroomRepository.update(id, data)
  }

  async listClassrooms(coachId: number, arenaId?: number) {
    return this.classroomRepository.findAll(coachId, arenaId)
  }

  getRepository() {
    return this.classroomRepository
  }
}
