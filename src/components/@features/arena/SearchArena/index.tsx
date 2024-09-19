'use client'
import React from 'react'

import { InputSearch, type TextChangeHandler } from '@/components/SearchBar/InputSearch'
import { useAppRecentArena, RecentItemArena } from '@/hooks/store/useAppRecent'
import { searchArena } from '@/services/api/arena/arena.api'
import { Box, Popover, PopoverAnchor, PopoverBody, PopoverContent } from '@chakra-ui/react'

import { FoundArenaItem } from './FoundArenaItem'
import { arenaToRecentItemDto } from './helper'

export const SearchArena: React.FC = () => {
  const [data, setData] = React.useState<RecentItemArena[]>([])
  const [search, setSearch] = React.useState<string>('')
  const [recentArenas] = useAppRecentArena()

  const fetchSearch = React.useCallback(async (text?: string | null) => {
    if (text) {
      const response = await searchArena(text)
      setData(arenaToRecentItemDto(response?.data || []))
    }
  }, [])

  const handleChange: TextChangeHandler = React.useCallback(
    text => {
      setSearch(text || '')
      fetchSearch(text)
      console.log('search', text)
    },
    [fetchSearch]
  )

  const loadCachedData = () => {
    if (recentArenas?.length && !search) setData(recentArenas)
  }

  const handleClear = () => {
    setSearch('')
    setData([])
  }

  const onFocus = () => loadCachedData()

  return (
    <Box marginTop={8} width={{ base: '100%', md: '100%' }} bgColor="gray.50" rounded="full" position="relative">
      <Popover isOpen={!!data?.length} placement="bottom-start" matchWidth>
        <InputSearch onFocus={onFocus} onChangeText={handleChange} onClear={search ? handleClear : undefined} />
        <PopoverAnchor>
          <div className="relative max-w-full" />
        </PopoverAnchor>
        <PopoverContent backgroundColor="rgba(255,255,255,0.2)" borderColor={'rgba(255,255,255,0.4)'} style={{ position: 'relative', width: '100%' }}>
          <PopoverBody width={{ base: '100%' }}>
            <div>
              {data?.length ? (
                <>
                  {data.map(foundItem => (
                    <FoundArenaItem key={foundItem.id} {...foundItem} onClick={handleClear} />
                  ))}
                </>
              ) : null}
            </div>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
