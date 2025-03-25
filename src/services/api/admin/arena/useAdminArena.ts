'use client'
import React from 'react'

import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import useFetcher from '@/hooks/useFetcher'
import type { IResponseClassroom } from '@/services/api/classroom'
import useSWR, { useSWRConfig } from 'swr'

import { type StoreArenaParams, adminGetArenaList, adminStoreArena } from './admin-arena.api'

export function useAdminArenaList(): [ClassroomDTO[], boolean] {
  const { data, isLoading } = useSWR<IResponseClassroom>(`/admin/arena`)

  return [data?.classrooms || [], isLoading] as const
}

export function useAdminArena() {
  const [requestList, loadingList] = useFetcher(adminGetArenaList)
  const [requestStore, loadingStore] = useFetcher(adminStoreArena)

  const { mutate } = useSWRConfig()

  const list = React.useCallback(async () => {
    const response = await requestList()
    if (response?.success) mutate(`/admin/arena`, response, false)
    return response
  }, [requestList, mutate])

  const store = React.useCallback(
    async (data: StoreArenaParams) => {
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
