import React from 'react'

import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useAdminArenaList } from '@/services/api/admin/arena/useAdminArena'
import { List } from '@chakra-ui/react'

import { ListItemArena, type ClickEditHandler } from './ListItemArena'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
}

export const ListArena: React.FC<Props> = ({ onEdit }) => {
  const [arenas, isLoading] = useAdminArenaList()

  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {arenas.map(arenas => (
        <ListItemArena {...arenas} onEdit={onEdit} key={arenas.id} />
      ))}
    </List>
  )
}
