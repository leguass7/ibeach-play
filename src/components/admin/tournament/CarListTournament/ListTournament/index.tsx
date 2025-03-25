import React from 'react'

import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useAdminTournamentList } from '@/services/api/admin/tournament/useAdminTournament'
import { List } from '@chakra-ui/react'

import { ListItemTournament, type ClickEditHandler } from './ListItemTournament'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
}

export const ListTournament: React.FC<Props> = ({ onEdit }) => {
  const [data, isLoading] = useAdminTournamentList()

  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {data.map(data => (
        <ListItemTournament {...data} onEdit={onEdit} key={data.id} />
      ))}
      {!isLoading && !data?.length ? <p>Nenhum torneio cadastrado</p> : null}
    </List>
  )
}
