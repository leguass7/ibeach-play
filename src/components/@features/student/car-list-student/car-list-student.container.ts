import React from 'react'

import { useCoachStudent } from '@/services/api/coach/student/useCoachStudent'

import { CarListStudentView, type CarListStudentViewProps } from './car-list-student'
import type { ClickEditHandler } from './list-student'

export const CarListStudentContainer: React.FC = () => {
  const { list, loading } = useCoachStudent()
  const [, setOpenForm] = React.useState(0)

  const handleClickNew = () => {
    setOpenForm(-1)
  }

  const handleClickEdit: ClickEditHandler = React.useCallback(id => {
    setOpenForm(+id)
  }, [])

  const props: CarListStudentViewProps = {
    loading,
    onClickNew: handleClickNew,
    onClickRefresh: list,
    onClickEdit: handleClickEdit
  }

  return React.createElement(CarListStudentView, props)
}
