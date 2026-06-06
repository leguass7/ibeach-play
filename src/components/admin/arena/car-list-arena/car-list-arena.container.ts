import React from 'react'

import { useAdminArena } from '@/services/api/admin/arena/useAdminArena'

import { CarListArenaView, type CarListArenaViewProps } from './car-list-arena'
import type { ClickEditHandler } from './list-arena'

export const CarListArenaContainer: React.FC = () => {
  const { list, loading, remove } = useAdminArena()
  const [openForm, setOpenForm] = React.useState(0)

  const handleClickNew = () => setOpenForm(-1)
  const handleClickClose = () => setOpenForm(0)
  const handleClickEdit: ClickEditHandler = (id: string | number) => setOpenForm(+id)
  const handleSuccess = async () => {
    setOpenForm(0)
    list()
  }

  const handleConfirmDelete = React.useCallback<ClickEditHandler>(
    async (id: string | number) => {
      await remove(id as number)
      setOpenForm(0)
      list()
    },
    [list, remove]
  )

  const props: CarListArenaViewProps = {
    openForm,
    loading,
    onClickNew: handleClickNew,
    onClickRefresh: list,
    onClickClose: handleClickClose,
    onClickEdit: handleClickEdit,
    onSuccess: handleSuccess,
    onConfirmDelete: handleConfirmDelete
  }

  return React.createElement(CarListArenaView, props)
}
