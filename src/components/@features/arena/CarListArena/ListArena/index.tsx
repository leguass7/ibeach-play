import React from 'react'

import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useCoachClassroomList } from '@/services/api/coach/useCoachClassroom'
import { List } from '@chakra-ui/react'

import { ListItemArena, type ClickEditHandler } from './ListItemArena'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
}

export const ListArena: React.FC<Props> = ({ onEdit }) => {
  const [classrooms, isLoading] = useCoachClassroomList()

  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {classrooms.map(classroom => (
        <ListItemArena {...classroom} onEdit={onEdit} key={classroom.id} />
      ))}
    </List>
  )
}
