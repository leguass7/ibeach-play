import { apiService } from '@/services/api/api.service'

export function getClassroom(classroomId: number) {
  return apiService.get(`/classroom/${classroomId}`)
}
