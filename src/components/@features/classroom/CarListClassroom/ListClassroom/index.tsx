import React from 'react'

import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useCoachClassroomList } from '@/services/api/coach/useCoachClassroom'
import { List } from '@chakra-ui/react'

import { ListItemClassroom, type ClickEditHandler } from './ListItemClassroom'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
}

export const ListClassroom: React.FC<Props> = ({ onEdit }) => {
  const [classrooms, isLoading] = useCoachClassroomList()

  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {classrooms.map(classroom => (
        <ListItemClassroom {...classroom} onEdit={onEdit} key={classroom.id} />
      ))}
    </List>
  )
}
