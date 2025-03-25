import { apiService } from '@/services/api/api.service'
import type { FormArenaData, IResponseArena } from '@/services/api/arena'

export function adminGetArenaList(): Promise<IResponseArena | null> {
  return apiService.get(`/admin/arena`)
}

export function adminGetArena(classroomId: number): Promise<IResponseArena | null> {
  return apiService.get(`/admin/arena/${classroomId}`)
}

export function adminCreateArena(data: FormArenaData): Promise<IResponseArena | null> {
  return apiService.post('/admin/arena', data)
}

export function adminUpdateArena(classroomId: number, data: Partial<FormArenaData>): Promise<IResponseArena | null> {
  return apiService.patch(`/admin/arena/${classroomId}`, data)
}

export type StoreArenaParams = FormArenaData & { id?: number }
export function adminStoreArena({ id, ...data }: StoreArenaParams): Promise<IResponseArena | null> {
  if (id) return adminUpdateArena(id, data)
  return adminCreateArena(data)
}

export function adminDeleteArena(classroomId: number): Promise<IResponseArena | null> {
  return apiService.get(`/admin/arena/${classroomId}`)
}
