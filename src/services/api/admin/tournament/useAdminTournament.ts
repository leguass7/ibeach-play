'use client'
import React from 'react'

import useFetcher from '@/hooks/useFetcher'
import type { IResponseTournament } from '@/services/api/tournament'
import useSWR, { useSWRConfig } from 'swr'

import type { TournamentDTO } from '~/use-cases/tournament'

import { type StoreTournamentParams, adminDeleteTournament, adminGetTournamentList, adminStoreTournament } from './admin-tournament.api'

export function useAdminTournamentList(): [TournamentDTO[], boolean] {
  const { data, isLoading } = useSWR<IResponseTournament>(`/admin/tournament`)

  return [data?.tournaments || [], isLoading] as const
}

export function useAdminTournament() {
  const [requestList, loadingList] = useFetcher(adminGetTournamentList)
  const [requestStore, loadingStore] = useFetcher(adminStoreTournament)
  const [requestRemove, loadingRemove] = useFetcher(adminDeleteTournament)

  const { mutate } = useSWRConfig()

  const list = React.useCallback(async () => {
    const response = await requestList()
    if (response?.success) mutate(`/admin/tournament`, response, false)
    return response
  }, [requestList, mutate])

  const store = React.useCallback(
    async (data: StoreTournamentParams) => {
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

  return { list, store, remove, loading }
}
