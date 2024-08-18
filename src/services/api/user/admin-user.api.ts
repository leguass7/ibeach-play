import { apiService } from '@/services/api/api.service'

export function paginateUsers() {
  return apiService.get('/admin/user')
}

export function getUser(userId: number) {
  return apiService.get(`/admin/user/${userId}`)
}
