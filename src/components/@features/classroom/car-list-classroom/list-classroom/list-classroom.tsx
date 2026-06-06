import React from 'react'

import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import { SkeletonListItem } from '@/components/ui/skeleton-list-item'
import { List } from '@chakra-ui/react'

import { ListItemClassroom, type ClickEditHandler } from './ListItemClassroom'

export type { ClickEditHandler }

export type ListClassroomViewProps = {
  classrooms: ClassroomDTO[]
  isLoading: boolean
  onEdit: ClickEditHandler
}

export function ListClassroomView({ classrooms, isLoading, onEdit }: ListClassroomViewProps) {
  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {classrooms.map(classroom => (
        <ListItemClassroom {...classroom} onEdit={onEdit} key={classroom.id} />
      ))}
    </List>
  )
}
