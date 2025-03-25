import useSWR from 'swr'

import type { IResponseCoachDash } from './coach-dash.interface'

export function useCoachDash() {
  const { data, isLoading } = useSWR<IResponseCoachDash>('/coach/dash')

  return { data, isLoading }
}
