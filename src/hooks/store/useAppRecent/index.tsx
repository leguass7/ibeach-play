import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { RootState } from '@/store'
import { setAppRecent, type IAppRecentState, type RecentItem } from '@/store/reducers/recent'

export type UseAppRecent = [recent: IAppRecentState, setRecent: (data: Partial<IAppRecentState>) => void]
export function useAppRecent(): UseAppRecent {
  const dispatch = useDispatch()
  const recent = useSelector<RootState, IAppRecentState>(state => state?.recent)

  const setRecent = React.useCallback(
    (data: Partial<IAppRecentState>) => {
      dispatch(setAppRecent(data))
    },
    [dispatch]
  )

  return [recent, setRecent]
}

export type RecentItemArena = RecentItem
export type UseAppRecentArena = [recentArenas: RecentItem[], addRecentArenas: (item: RecentItem) => void]
export function useAppRecentArena(): UseAppRecentArena {
  const dispatch = useDispatch()
  const recentArenas = useSelector<RootState, RecentItem[]>(state => state?.recent?.arena || [])

  const setRecentArenas = React.useCallback(
    (arena: RecentItem[]) => {
      dispatch(setAppRecent({ arena }))
    },
    [dispatch]
  )

  const addRecentArenas = React.useCallback(
    (item: RecentItem) => {
      const list = [item, ...recentArenas.filter(i => i.id !== item.id).slice(0, 3)]
      setRecentArenas(list)
    },
    [recentArenas, setRecentArenas]
  )

  return [recentArenas, addRecentArenas]
}
