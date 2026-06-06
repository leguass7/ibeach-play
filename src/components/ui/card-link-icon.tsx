'use client'
import React from 'react'
import type { IconType } from 'react-icons/lib'

import { Icon } from '@chakra-ui/icons'
import { Card, CardBody, Heading, Skeleton, Stack, Text } from '@chakra-ui/react'

export type CardLinkIconProps = {
  icon?: IconType
  title: string
  description: string
  onClick?: () => void
  color?: string
  isLoading?: boolean
}

export const CardLinkIcon: React.FC<CardLinkIconProps> = ({ icon, title, description, isLoading, onClick, color = 'blue.900' }) => {
  return (
    <Card direction={{ base: 'row' }} p={0} overflow={'hidden'} onClick={onClick} cursor={onClick ? 'pointer' : 'default'}>
      {icon ? (
        <Stack direction={'column'} align={'center'} justify={'center'} p={2} color={'white'} bgColor={color}>
          <Icon as={icon} boxSize={'72px'} />
        </Stack>
      ) : null}

      <Stack spacing={0}>
        <CardBody pb={0}>
          <Heading size={'md'} py={0}>
            {title}
          </Heading>
          {isLoading ? <Skeleton height={'16px'} width={'140px'} mt={1} /> : <Text>{description}</Text>}
        </CardBody>
      </Stack>
    </Card>
  )
}
