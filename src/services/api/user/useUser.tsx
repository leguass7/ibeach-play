import { apiService } from '@/services/api/api.service'
import useSWR from 'swr'

export function useUser() {
  const use = useSWR('/user', apiService.getFetcher(), {})
  return use
}
