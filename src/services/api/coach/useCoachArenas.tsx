import React from 'react'

import type { Options, FetchHandler, ItemOption, LoadedHandler } from '@/components/Inputs/selects/SelectFetcher'
import useFetcher from '@/hooks/useFetcher'

import type { ArenaOptionDto } from '../arena'
import { coachGetArenaOptions } from './coach-arena.api'

export type { ArenaOptionDto, Options, FetchHandler, LoadedHandler, ItemOption }

function arenaToOptionsDto(arena: ArenaOptionDto[] = []): Options {
  return Array.isArray(arena) ? arena?.map?.(({ id, name }) => ({ value: id, label: name })) : []
}

export function useCoachArenaOptions(): [fetcher: FetchHandler, loading: boolean, data: Options] {
  const [requestList, loading, data] = useFetcher(coachGetArenaOptions)

  const fetcher = React.useCallback<FetchHandler>(async () => {
    const result = await requestList()
    return arenaToOptionsDto(result?.arenas || [])
  }, [requestList])

  return [fetcher, loading, arenaToOptionsDto(data?.arenas)] as const
}
