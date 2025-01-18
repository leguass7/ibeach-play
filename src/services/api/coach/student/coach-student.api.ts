import type { CreateStudentDTO } from '@/@server-side/use-cases/student'
import { apiService } from '@/services/api/api.service'

import type { ICoachStudentResponse } from './coach-student.interface'

export type StudentListFilter = {
  classroomId?: number
  arenaId?: number
}
export function coachGetStudentList(params?: StudentListFilter): Promise<ICoachStudentResponse | null> {
  return apiService.get(`/coach/student`, { params: { ...params, test: '1' } })
}

export function coachGetStudent(studentId: string): Promise<ICoachStudentResponse | null> {
  return apiService.get(`/coach/student/${studentId}`)
}

export function coachCreateStudent(data: CreateStudentDTO): Promise<ICoachStudentResponse | null> {
  return apiService.post('/coach/student', data)
}

export function coachDeleteStudent(studentId: string): Promise<ICoachStudentResponse | null> {
  return apiService.delete(`/coach/student/${studentId}`)
}

export type StoreStudentParams = CreateStudentDTO & { id?: string }
export function coachStoreStudent({ id, ...data }: StoreStudentParams): Promise<ICoachStudentResponse | null> {
  if (id) return coachDeleteStudent(id)
  return coachCreateStudent(data)
}
