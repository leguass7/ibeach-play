import React from 'react'
import { CgLogOff } from 'react-icons/cg'

import { Icon } from '@chakra-ui/icons'
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'

export const UserProfile: React.FC = () => {
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <Menu>
      <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
        <Avatar size={'sm'} src={data?.user?.image || ''} />
      </MenuButton>
      <MenuList>
        <MenuItem>Link 1</MenuItem>
        <MenuItem>Link 2</MenuItem>
        <MenuDivider />
        <MenuItem icon={<Icon as={CgLogOff} />} onClick={handleLogout}>
          Sair
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
