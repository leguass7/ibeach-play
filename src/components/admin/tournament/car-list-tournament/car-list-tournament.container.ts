import React from 'react'

import { useAdminTournament } from '@/services/api/admin/tournament/useAdminTournament'

import { CarListTournamentView, type CarListTournamentViewProps } from './car-list-tournament'
import type { ClickEditHandler } from './list-tournament'

export const CarListTournamentContainer: React.FC = () => {
  const { list, loading, remove } = useAdminTournament()
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

  const props: CarListTournamentViewProps = {
    openForm,
    loading,
    onClickNew: handleClickNew,
    onClickRefresh: list,
    onClickClose: handleClickClose,
    onClickEdit: handleClickEdit,
    onSuccess: handleSuccess,
    onConfirmDelete: handleConfirmDelete
  }

  return React.createElement(CarListTournamentView, props)
}
