import React from 'react'
import type { IconType } from 'react-icons/lib'

import { Icon } from '@chakra-ui/icons'
import { Card, CardBody, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type CardLinkIconProps = {
  icon?: IconType
  title: string
  description: string
  link: string
  color?: string
}

export const CardLinkIcon: React.FC<CardLinkIconProps> = ({ icon, title, description, link, color = 'blue.900' }) => {
  const navigation = useRouter()

  const handleClick = () => {
    if (link) navigation.push(link)
  }

  return (
    <Card direction={{ base: 'row' }} p={0} overflow={'hidden'} onClick={handleClick} cursor={link ? 'pointer' : 'default'}>
      {icon ? (
        <Flex direction={'column'} align={'center'} justify={'center'} p={2} color={'white'} bgColor={color}>
          <Icon as={icon} boxSize={'72px'} />
        </Flex>
      ) : null}

      <Stack spacing={0}>
        <CardBody pb={0}>
          <Heading size={'md'} py={0}>
            {title}
          </Heading>
          <Text>{description}</Text>
        </CardBody>
      </Stack>
    </Card>
  )
}
