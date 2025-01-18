import type { IStudentResponse } from '@/services/api/student'
import useSWR from 'swr'

export function useCoachStudentList() {
  const { data, isLoading } = useSWR<IStudentResponse>('/coach/student')
  return { data, isLoading }
}
