import type { ClassroomRepository } from './classroom.repository'

export class ClassroomService {
  constructor(private readonly classroomRepository: ClassroomRepository) {}

  getReposytory() {
    return this.classroomRepository
  }

  async search(text: string | null = '') {
    if (!text) return []
    //
    return []
  }
}
