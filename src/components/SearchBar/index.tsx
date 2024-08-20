import React from 'react'

import { Box, Menu, MenuItem, MenuList } from '@chakra-ui/react'

import { InputSearch, type TextChangeHandler } from './InputSearch'

export const SearchBar: React.FC = () => {
  const [search, setSearch] = React.useState<string>('')

  const handleChange: TextChangeHandler = React.useCallback(text => {
    setSearch(text || '')
    console.log('search', text)
  }, [])

  const handleClear = () => {
    setSearch('')
  }

  return (
    <Menu>
      <Box marginTop={8} width={{ base: '100%', md: '100%' }} bgColor="gray.50" padding={1} rounded="full" position="relative">
        <InputSearch onChangeText={handleChange} onClear={search ? handleClear : undefined} />
      </Box>
      <MenuList>
        {/* MenuItems are not rendered unless Menu is open */}
        <MenuItem>{search}</MenuItem>
        <MenuItem>Open Closed Tab</MenuItem>
        <MenuItem>Open File</MenuItem>
      </MenuList>
    </Menu>
  )
}
