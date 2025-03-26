'use client'
import React from 'react'

import useFetcher from '@/hooks/useFetcher'
import type { IResponseTournamentStage } from '@/services/api/tournament-stage'
import useSWR, { useSWRConfig } from 'swr'

import type { TournamentStageDTO } from '~/use-cases/tournament-stage'

import {
  type StoreTournamentStageParams,
  adminDeleteTournamentStage,
  adminGetTournamentStageList,
  adminStoreTournamentStage
} from './admin-tournament-stage.api'

export function useAdminTournamentStageList(tournamentId?: number | null): [TournamentStageDTO[], boolean] {
  const { data, isLoading } = useSWR<IResponseTournamentStage>(`/admin/tournament-stage?tournamentId=${tournamentId || ''}`)
  return [data?.tournamentStages || [], isLoading] as const
}

export function useAdminTournamentStage(tournamentId?: number | null) {
  const [requestList, loadingList] = useFetcher(adminGetTournamentStageList)
  const [requestStore, loadingStore] = useFetcher(adminStoreTournamentStage)
  const [requestRemove, loadingRemove] = useFetcher(adminDeleteTournamentStage)

  const { mutate } = useSWRConfig()

  const list = React.useCallback(async () => {
    const response = await requestList(tournamentId)
    if (response?.success) mutate(`/admin/tournament-stage?tournamentId=${tournamentId || ''}`, response, false)
    return response
  }, [requestList, mutate, tournamentId])

  const store = React.useCallback(
    async (data: StoreTournamentStageParams) => {
      if (tournamentId) data.tournamentId = tournamentId
      const response = await requestStore(data)
      return response
    },
    [requestStore, tournamentId]
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
