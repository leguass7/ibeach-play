import React from 'react'

import { useCoachStudentList } from '@/services/api/coach/student/useCoachStudent'

import { ListStudentView, type ListStudentViewProps, type ClickEditHandler } from './list-student'

export type { ClickEditHandler }

type ListStudentContainerProps = {
  onEdit: ClickEditHandler
}

export const ListStudentContainer: React.FC<ListStudentContainerProps> = ({ onEdit }) => {
  const [students, isLoading] = useCoachStudentList()

  const props: ListStudentViewProps = { students, isLoading, onEdit }

  return React.createElement(ListStudentView, props)
}
