import { apiService } from '@/services/api/api.service'

export function paginateUsers() {
  return apiService.get('/admin/user')
}
