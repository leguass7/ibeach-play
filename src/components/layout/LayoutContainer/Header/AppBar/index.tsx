'use client'

import React from 'react'

import iconLogo from '@/assets/logo/iconLogo.png'
import type { IRoutes } from '@/components/layout/layout.type'
import { UserProfile } from '@/components/UserProfile'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Box, Flex, HStack, Icon, IconButton, Stack, Text, useColorModeValue, useDisclosure, Image } from '@chakra-ui/react'

type NavlinkProps = {
  name: string
  layout: string
  path: string
  children?: React.ReactNode
  icon?: React.ElementType
}

const NavLink: React.FC<NavlinkProps> = ({ layout, path, children, name, icon }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700')
      }}
      href={`${layout}${path}`}
    >
      {icon ? <Icon as={icon} w={5} h={5} /> : null}
      <Text>{name}</Text>
      {children}
    </Box>
  )
}

type AppBarProps = {
  routes?: IRoutes[]
}

export const AppBar: React.FC<AppBarProps> = ({ routes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Stack paddingX={4} justify="space-between" bg={useColorModeValue('transparent', 'gray.900')}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>
              <Image width={10} src={iconLogo.src} alt="Logo" />
            </Box>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {routes?.map(route => (
                <>
                  <NavLink key={`${route?.layout}-${route?.name}`} name={route?.name} layout={route?.layout} icon={route?.icon} path={route?.path} />
                </>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <UserProfile />
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {routes?.map(route => (
                <>
                  <NavLink key={`${route?.layout}-${route?.name}`} name={route?.name} layout={route?.layout} icon={route?.icon} path={route?.path} />
                </>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Stack>
    </>
  )
}
