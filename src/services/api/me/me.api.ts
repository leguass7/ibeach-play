import { apiService } from '@/services/api/api.service'

import type { FormChangePasswordData } from './me.validation'

export function meChangePass(data: FormChangePasswordData) {
  return apiService.post('/me/change-pass', data)
}
