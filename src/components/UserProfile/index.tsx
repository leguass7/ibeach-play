import React from 'react'
import { CgLogOff, CgProfile } from 'react-icons/cg'

import { Icon } from '@chakra-ui/icons'
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { OfflineProfileButton } from './OfflineProfileButton'

export const UserProfile: React.FC = () => {
  const navigation = useRouter()
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  const handleMeClick = () => {
    navigation.push('/me')
  }

  return (
    <>
      {data?.user?.id ? (
        <Menu>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
            <Avatar size={'sm'} src={data?.user?.image || ''} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<Icon as={CgProfile} />} onClick={handleMeClick}>
              Minhas informações
            </MenuItem>
            <MenuItem disabled as={'button'}>
              Links groupIds
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<Icon as={CgLogOff} />} onClick={handleLogout}>
              Sair
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <OfflineProfileButton />
      )}
    </>
  )
}
