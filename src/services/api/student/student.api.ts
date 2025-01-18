import { apiService } from '@/services/api/api.service'

import type { IStudentResponse } from './student.interface'

export async function getStudents(classroomId: number) {
  return apiService.get<IStudentResponse>(`/students/${classroomId}`)
}
