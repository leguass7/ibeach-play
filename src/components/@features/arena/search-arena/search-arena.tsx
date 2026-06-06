'use client'
import React from 'react'

import { InputSearch, type TextChangeHandler } from '@/components/search-bar/InputSearch'
import type { RecentItemArena } from '@/hooks/store/useAppRecent'
import { Box, Popover, PopoverAnchor, PopoverBody, PopoverContent } from '@chakra-ui/react'

import { FoundArenaItem } from './FoundArenaItem'

export type SearchArenaViewProps = {
  data: RecentItemArena[]
  search: string
  onChangeText: TextChangeHandler
  onFocus: () => void
  onClear?: () => void
}

export function SearchArenaView({ data, onChangeText, onFocus, onClear }: SearchArenaViewProps) {
  return (
    <Box marginTop={8} width={{ base: '100%', md: '100%' }} bgColor="gray.50" rounded="full" position="relative">
      <Popover isOpen={!!data?.length} placement="bottom-end" matchWidth>
        <PopoverAnchor>
          <div>
            <InputSearch onFocus={onFocus} onChangeText={onChangeText} onClear={onClear} />
          </div>
        </PopoverAnchor>
        <PopoverContent backgroundColor="rgba(255,255,255,0.2)" borderColor={'rgba(255,255,255,0.4)'} style={{ position: 'relative', width: '100%' }}>
          <PopoverBody width={{ base: '100%' }}>
            <div>
              {data?.length ? (
                <>
                  {data.map(foundItem => (
                    <FoundArenaItem key={foundItem.id} {...foundItem} onClick={onClear} />
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
