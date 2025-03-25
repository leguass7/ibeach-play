import { apiService } from '@/services/api/api.service'
import type { FormArenaData, IResponseArena } from '@/services/api/arena'

export function adminGetArenaList(): Promise<IResponseArena | null> {
  return apiService.get(`/admin/arena`)
}

export function adminGetArena(classroomId: number): Promise<IResponseArena | null> {
  return apiService.get(`/admin/arena/${classroomId}`)
}

export function adminCreateArena(data: FormArenaData): Promise<IResponseArena | null> {
  if (!data?.cityId) data.cityId = 2304400 // FIXME: temporary
  if (!data?.userId) data.userId = 1 // FIXME: temporary
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

export function adminDeleteArena(id: number): Promise<IResponseArena | null> {
  return apiService.delete(`/admin/arena/${id}`)
}
