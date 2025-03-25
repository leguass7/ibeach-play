import useSWR from 'swr'

import type { IResponseAdminDash } from './admin-dash.interface'

export function useAdminDash() {
  const { data, isLoading } = useSWR<IResponseAdminDash>('/admin/dash')

  return { data, isLoading }
}
