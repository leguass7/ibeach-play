import React from 'react'

import { TextLimited } from '@/components/TextLimited'
import { useAppRecentArena, type RecentItemArena } from '@/hooks/store/useAppRecent'
import { Heading, LinkBox, LinkOverlay } from '@chakra-ui/react'

type Props = RecentItemArena & {
  onClick?: () => void
}

export const FoundArenaItem: React.FC<Props> = ({ id, name, onClick, description }) => {
  const [, addRecentArenas] = useAppRecentArena()

  const handleClick = () => {
    addRecentArenas({ id, name, description })
    onClick?.()
  }

  return (
    <LinkBox as="div" maxW="100%" px="3" py="2" borderWidth="1px" rounded="md" mb={1} backgroundColor={'#fff'}>
      <Heading size="md" mb="1">
        <LinkOverlay as="button" onClick={handleClick}>
          {name}
        </LinkOverlay>
      </Heading>
      <TextLimited limit={254} mb="1">
        {description}
      </TextLimited>
    </LinkBox>
  )
}
