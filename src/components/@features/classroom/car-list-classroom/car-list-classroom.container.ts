import React from 'react'

import { useCoachClassroom } from '@/services/api/coach/useCoachClassroom'

import { CarListClassroomView, type CarListClassroomViewProps } from './car-list-classroom'
import type { ClickEditHandler } from './list-classroom'

export const CarListClassroomContainer: React.FC = () => {
  const { list, loading } = useCoachClassroom()
  const [openForm, setOpenForm] = React.useState(0)

  const handleClickNew = () => {
    setOpenForm(-1)
  }

  const handleClickClose = () => {
    setOpenForm(0)
  }

  const handleClickEdit: ClickEditHandler = id => {
    setOpenForm(+id)
  }

  const props: CarListClassroomViewProps = {
    openForm,
    loading,
    onClickNew: handleClickNew,
    onClickRefresh: list,
    onClickClose: handleClickClose,
    onClickEdit: handleClickEdit
  }

  return React.createElement(CarListClassroomView, props)
}
