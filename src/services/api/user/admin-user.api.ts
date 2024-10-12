import { apiService } from '@/services/api/api.service'

import type { IUserResponse } from './user.interface'

export function paginateUsers(): Promise<IUserResponse | null> {
  return apiService.get('/admin/user')
}

export function getUser(userId: number) {
  return apiService.get(`/admin/user/${userId}`)
}
