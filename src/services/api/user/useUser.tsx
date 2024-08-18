import { apiService } from '@/services/api/api.service'
import useSWR from 'swr'

export function useAdminUser() {
  const data = useSWR('/admin/user', apiService.getFetcher(), {})
  return data
}
