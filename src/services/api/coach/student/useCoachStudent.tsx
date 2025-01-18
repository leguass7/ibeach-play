import React from 'react'

import useFetcher from '@/hooks/useFetcher'
import type { IStudent, IStudentResponse } from '@/services/api/student'
import useSWR, { useSWRConfig } from 'swr'

import { coachGetStudentList, coachStoreStudent, type StoreStudentParams } from './coach-student.api'

export function useCoachStudentList(): [IStudent[], boolean] {
  const { data, isLoading } = useSWR<IStudentResponse>(`/coach/student`)

  return [data?.students || [], isLoading] as const
}

export function useCoachStudent() {
  const [requestList, loadingList] = useFetcher(coachGetStudentList)
  const [requestStore, loadingStore] = useFetcher(coachStoreStudent)

  const { mutate } = useSWRConfig()

  const list = React.useCallback(async () => {
    const response = await requestList()
    if (response?.success) mutate(`/coach/student`, response, false)
    return response
  }, [requestList, mutate])

  const store = React.useCallback(
    async (data: StoreStudentParams) => {
      const response = await requestStore(data)
      return response
    },
    [requestStore]
  )

  const loading = React.useMemo(() => {
    return loadingList || loadingStore
  }, [loadingList, loadingStore])

  return { list, store, loading }
}
