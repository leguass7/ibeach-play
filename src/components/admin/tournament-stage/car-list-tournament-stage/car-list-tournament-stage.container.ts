import React from 'react'

import { useAdminTournamentStage } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'

import { CarListTournamentStageView, type CarListTournamentStageViewProps } from './car-list-tournament-stage'
import type { ClickEditHandler } from './list-tournament-stage'

type ContainerProps = {
  tournamentId: number
}

export const CarListTournamentStageContainer: React.FC<ContainerProps> = ({ tournamentId }) => {
  const { list, loading, remove } = useAdminTournamentStage(tournamentId)
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

  const props: CarListTournamentStageViewProps = {
    tournamentId,
    openForm,
    loading,
    onClickNew: handleClickNew,
    onClickRefresh: list,
    onClickClose: handleClickClose,
    onClickEdit: handleClickEdit,
    onSuccess: handleSuccess,
    onConfirmDelete: handleConfirmDelete
  }

  return React.createElement(CarListTournamentStageView, props)
}
