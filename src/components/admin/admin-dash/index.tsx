import React from 'react'
import { TbShareplay, TbTournament, TbUsers } from 'react-icons/tb'

import { CardLinkIcon } from '@/components/ui/card-link-icon'
import { useAdminDash } from '@/services/api/admin/useAdminDash'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const AdminDash: React.FC = () => {
  const router = useRouter()
  const { data, isLoading } = useAdminDash()

  const arenaCount = data?.arenaCount || 0
  const tournamentCount = data?.tournamentCount || 0
  const userCount = data?.userCount || 0

  return (
    <SimpleGrid gap={5} columns={{ lg: 4, xl: 4, md: 3, base: 1, sm: 2 }}>
      <GridItem>
        <CardLinkIcon
          icon={TbUsers}
          title="Usuários"
          description={`${userCount} usu
         ários cadatrado
         s`}
          onClick={() => router.push('/admin/user')}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={TbShareplay}
          title="Arenas"
          description={`${arenaCount} arenas cadatradas`}
          onClick={() => router.push('/admin/arena')}
          isLoading={isLoading}
        />
      </GridItem>
      <GridItem>
        <CardLinkIcon
          icon={TbTournament}
          title="Torneios"
          description={`${tournamentCount} torneios cadatrados`}
          onClick={() => router.push('/admin/tournament')}
          isLoading={isLoading}
        />
      </GridItem>
    </SimpleGrid>
  )
}
