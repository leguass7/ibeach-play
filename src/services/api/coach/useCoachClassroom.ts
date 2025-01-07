'use client'
import React from 'react'

import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import useFetcher from '@/hooks/useFetcher'
import type { IResponseClassroom } from '@/services/api/classroom'
import useSWR, { useSWRConfig } from 'swr'

import { coachGetClassroomList, coachStoreClassroom, type StoreClassroomParams } from './coach-classroom.api'

export function useCoachClassroomList(): [ClassroomDTO[], boolean] {
  const { data, isLoading } = useSWR<IResponseClassroom>(`/coach/classroom`)

  return [data?.classrooms || [], isLoading] as const
}

export function useCoachClassroom() {
  const [requestList, loadingList] = useFetcher(coachGetClassroomList)
  const [requestStore, loadingStore] = useFetcher(coachStoreClassroom)

  const { mutate } = useSWRConfig()

  const list = React.useCallback(async () => {
    const response = await requestList()
    if (response?.success) mutate(`/coach/classroom`, response, false)
    return response
  }, [requestList, mutate])

  const store = React.useCallback(
    async (data: StoreClassroomParams) => {
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
