import { apiService } from '@/services/api/api.service'

import type { FormClassroomData, IResponseClassroom } from '../classroom'

export function coachGetClassroomList(): Promise<IResponseClassroom | null> {
  return apiService.get(`/coach/classroom`)
}

export function coachGetClassroom(classroomId: number): Promise<IResponseClassroom | null> {
  return apiService.get(`/coach/classroom/${classroomId}`)
}

export function coachCreateClassroom(data: FormClassroomData): Promise<IResponseClassroom | null> {
  return apiService.post('/coach/classroom', data)
}

export function coachUpdateClassroom(classroomId: number, data: Partial<FormClassroomData>): Promise<IResponseClassroom | null> {
  return apiService.patch(`/coach/classroom/${classroomId}`, data)
}

export type StoreClassroomParams = FormClassroomData & { classroomId?: number }
export function coachStoreClassroom({ classroomId, ...data }: StoreClassroomParams): Promise<IResponseClassroom | null> {
  if (classroomId) return coachUpdateClassroom(classroomId, data)
  return coachCreateClassroom(data)
}

export function coachDeleteClassroom(classroomId: number): Promise<IResponseClassroom | null> {
  return apiService.get(`/coach/classroom/${classroomId}`)
}
