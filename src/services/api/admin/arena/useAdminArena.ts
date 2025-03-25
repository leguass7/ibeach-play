'use client'
import React from 'react'

import useFetcher from '@/hooks/useFetcher'
import type { IResponseArena } from '@/services/api/arena'
import useSWR, { useSWRConfig } from 'swr'

import type { ArenaDTO } from '~/use-cases/arena'

import { type StoreArenaParams, adminDeleteArena, adminGetArenaList, adminStoreArena } from './admin-arena.api'

export function useAdminArenaList(): [ArenaDTO[], boolean] {
  const { data, isLoading } = useSWR<IResponseArena>(`/admin/arena`)

  return [data?.arenas || [], isLoading] as const
}

export function useAdminArena() {
  const [requestList, loadingList] = useFetcher(adminGetArenaList)
  const [requestStore, loadingStore] = useFetcher(adminStoreArena)
  const [requestRemove, loadingRemove] = useFetcher(adminDeleteArena)

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

  const remove = React.useCallback(
    async (id: number) => {
      const response = await requestRemove(id)
      return response
    },
    [requestRemove]
  )

  const loading = React.useMemo(() => {
    return loadingList || loadingStore || loadingRemove
  }, [loadingList, loadingStore, loadingRemove])

  return { list, store, loading, remove }
}
