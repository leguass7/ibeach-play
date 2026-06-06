import React from 'react'

import { useCoachClassroomList } from '@/services/api/coach/useCoachClassroom'

import { ListClassroomView, type ListClassroomViewProps, type ClickEditHandler } from './list-classroom'

export type { ClickEditHandler }

type ListClassroomContainerProps = {
  onEdit: ClickEditHandler
}

export const ListClassroomContainer: React.FC<ListClassroomContainerProps> = ({ onEdit }) => {
  const [classrooms, isLoading] = useCoachClassroomList()

  const props: ListClassroomViewProps = { classrooms, isLoading, onEdit }

  return React.createElement(ListClassroomView, props)
}
