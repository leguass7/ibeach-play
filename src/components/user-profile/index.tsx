import React from 'react'
import { CgLogOff, CgProfile, CgCrown } from 'react-icons/cg'
import { PiChalkboardTeacher } from 'react-icons/pi'

import { clickWhithStop } from '@/helpers/dom'
import { Icon } from '@chakra-ui/icons'
import { Avatar, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { OfflineProfileButton } from './OfflineProfileButton'

const accessModules = [
  { id: 'me', path: '/me', label: 'Minhas informações', icon: CgProfile, groupIds: null },
  { id: 'admin', path: '/admin', label: 'Administrador', icon: CgCrown, groupIds: [1] },
  { id: 'coach', path: '/coach', label: 'Treinador', icon: PiChalkboardTeacher, groupIds: [1, 5] }
  //
]

export const UserProfile: React.FC = () => {
  const navigation = useRouter()
  const { data } = useSession()

  const handleLogout = async () => {
    await signOut()
  }

  const handleMeClick = (path: string) => {
    return () => {
      navigation.push(path)
    }
  }

  const allowedModules = React.useMemo(() => {
    return accessModules.filter(module => {
      if (module?.groupIds) return module.groupIds.some(groupId => data?.groups?.includes(groupId))
      return true
    })
  }, [data])

  React.useEffect(() => {
    allowedModules.forEach(({ path }) => navigation.prefetch(path))
  }, [allowedModules, navigation])

  return (
    <>
      {data?.user?.id ? (
        <Menu preventOverflow closeOnSelect>
          <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
            <Avatar size={'sm'} src={data?.user?.image || ''} />
          </MenuButton>
          <MenuList>
            {allowedModules.map(module => {
              return (
                <MenuItem
                  key={module.id}
                  as={'button'}
                  icon={module.icon && <Icon as={module.icon} />}
                  onClick={clickWhithStop(handleMeClick(module.path))}
                >
                  {module.label}
                </MenuItem>
              )
            })}
            <MenuDivider />
            <MenuItem icon={<Icon as={CgLogOff} />} onClick={clickWhithStop(handleLogout)}>
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
