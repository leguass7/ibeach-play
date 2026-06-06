import React from 'react'

import { SkeletonListItem } from '@/components/ui/skeleton-list-item'
import type { IStudent } from '@/services/api/student'
import { List } from '@chakra-ui/react'

import { ListItemStudent, type ClickEditHandler } from './ListItemStudent'

export type { ClickEditHandler }

export type ListStudentViewProps = {
  students: IStudent[]
  isLoading: boolean
  onEdit: ClickEditHandler
}

export function ListStudentView({ students, isLoading, onEdit }: ListStudentViewProps) {
  if (isLoading) return <SkeletonListItem />

  if (!isLoading && !students?.length) return <p>Nenhum aluno cadastrado</p>

  return <List spacing={3}>{students?.map?.(student => <ListItemStudent {...student} onEdit={onEdit} key={student.id} />)}</List>
}
