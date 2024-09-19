import React from 'react'

import { searchArena, type SummaryArena } from '@/services/api/arena/arena.api'
import { Box, Link, Popover, PopoverAnchor, PopoverBody, PopoverContent } from '@chakra-ui/react'

import { InputSearch, type TextChangeHandler } from './InputSearch'

/** @deprecated */
export const SearchBar: React.FC = () => {
  const [search, setSearch] = React.useState<string>('')
  const [data, setData] = React.useState<SummaryArena[]>([])

  const handleChange: TextChangeHandler = React.useCallback(text => {
    setSearch(text || '')
    console.log('search', text)
  }, [])

  const handleClear = () => {
    setSearch('')
    setData([])
  }

  const fetchSearch = React.useCallback(async (text?: string | null) => {
    if (text) {
      const response = await searchArena(text)
      setData(response?.data || [])
    }
  }, [])

  React.useEffect(() => {
    fetchSearch(search)
  }, [search, fetchSearch])

  return (
    <Box marginTop={8} width={{ base: '100%', md: '100%' }} bgColor="gray.50" rounded="full" position="relative">
      <Popover isOpen={!!data?.length} placement="bottom-start" matchWidth>
        <InputSearch onChangeText={handleChange} onClear={search ? handleClear : undefined} />
        <PopoverAnchor>
          <div className="relative max-w-full" />
        </PopoverAnchor>
        <PopoverContent style={{ position: 'relative', width: '100%' }}>
          <PopoverBody width={{ base: '100%' }}>
            <div>
              {data?.length ? (
                <>
                  {data.map((item, index) => (
                    <div key={index}>
                      <Link>{item?.name}</Link>
                    </div>
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
