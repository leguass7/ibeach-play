import React from 'react'
import { TbShareplay, TbTournament } from 'react-icons/tb'

import { CardLinkIcon } from '@/components/CardLinkIcon'
import { useAdminDash } from '@/services/api/admin/useAdminDash'
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export const AdminDash: React.FC = () => {
  const { data, isLoading } = useAdminDash()

  const arenaCount = data?.arenaCount || 0
  const tournamentCount = data?.tournamentCount || 0

  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon icon={TbShareplay} title="Arenas" description={`${arenaCount} arenas cadatradas`} link="/admin/arena" isLoading={isLoading} />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={TbTournament}
          title="Torneios"
          description={`${tournamentCount} torneios cadatrados`}
          link="/admin/tournament"
          isLoading={isLoading}
        />
      </GridItem>
    </SimpleGrid>
  )
}
