import React from 'react'

import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useCoachStudentList } from '@/services/api/coach/student/useCoachStudent'
import { List } from '@chakra-ui/react'

import { ListItemStudent, type ClickEditHandler } from './ListItemStudent'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
}

export const ListStudent: React.FC<Props> = ({ onEdit }) => {
  const [students, isLoading] = useCoachStudentList()

  if (isLoading) return <SkeletonListItem />

  if (!isLoading && !students?.length) return <p>Nenhum aluno cadastrado</p>

  return <List spacing={3}>{students?.map?.(student => <ListItemStudent {...student} onEdit={onEdit} key={student.id} />)}</List>
}
