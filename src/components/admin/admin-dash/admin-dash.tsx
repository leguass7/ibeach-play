import React from 'react'
import { TbShareplay, TbTournament, TbUsers } from 'react-icons/tb'

import { CardLinkIcon } from '@/components/ui/card-link-icon'
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export type AdminDashViewProps = {
  userCount: number
  arenaCount: number
  tournamentCount: number
  isLoading: boolean
  onClickUsers: () => void
  onClickArenas: () => void
  onClickTournaments: () => void
}

export function AdminDashView({
  userCount,
  arenaCount,
  tournamentCount,
  isLoading,
  onClickUsers,
  onClickArenas,
  onClickTournaments
}: AdminDashViewProps) {
  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon
          icon={TbUsers}
          title="Usuários"
          description={`${userCount} usuários cadastrados`}
          onClick={onClickUsers}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={TbShareplay}
          title="Arenas"
          description={`${arenaCount} arenas cadastradas`}
          onClick={onClickArenas}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={TbTournament}
          title="Torneios"
          description={`${tournamentCount} torneios cadastrados`}
          onClick={onClickTournaments}
          isLoading={isLoading}
        />
      </GridItem>
    </SimpleGrid>
  )
}
