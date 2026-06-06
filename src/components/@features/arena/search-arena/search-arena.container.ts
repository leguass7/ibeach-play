import React from 'react'

import type { TextChangeHandler } from '@/components/search-bar/InputSearch'
import { useAppRecentArena, type RecentItemArena } from '@/hooks/store/useAppRecent'
import { searchArena } from '@/services/api/arena/arena.api'

import { arenaToRecentItemDto } from './helper'
import { SearchArenaView, type SearchArenaViewProps } from './search-arena'

export const SearchArenaContainer: React.FC = () => {
  const [data, setData] = React.useState<RecentItemArena[]>([])
  const [search, setSearch] = React.useState<string>('')
  const [recentArenas] = useAppRecentArena()

  const fetchSearch = React.useCallback(async (text?: string | null) => {
    if (text) {
      const response = await searchArena(text)
      setData(arenaToRecentItemDto(response?.data || []) as RecentItemArena[])
    }
  }, [])

  const handleChangeText: TextChangeHandler = React.useCallback(
    text => {
      setSearch(text || '')
      fetchSearch(text)
    },
    [fetchSearch]
  )

  const handleClear = () => {
    setSearch('')
    setData([])
  }

  const loadCachedData = () => {
    if (recentArenas?.length && !search) setData(recentArenas)
  }

  const props: SearchArenaViewProps = {
    data,
    search,
    onChangeText: handleChangeText,
    onFocus: loadCachedData,
    onClear: search ? handleClear : undefined
  }

  return React.createElement(SearchArenaView, props)
}
