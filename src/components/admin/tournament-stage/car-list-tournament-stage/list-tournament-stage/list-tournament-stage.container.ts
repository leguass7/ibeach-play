import React from 'react'

import { useAlert } from '@/components/alert'
import { useAdminTournamentStageList } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'

import { ListTournamentStageView, type ListTournamentStageViewProps, type ClickEditHandler } from './list-tournament-stage'

type ContainerProps = {
  tournamentId: number
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListTournamentStageContainer: React.FC<ContainerProps> = ({ tournamentId, onEdit, onConfirmDelete }) => {
  const [data, isLoading] = useAdminTournamentStageList(tournamentId)
  const { createAlert } = useAlert()

  const handleDelete = React.useCallback<ClickEditHandler>(
    id => {
      const found = data.find(item => item.id === id)
      createAlert({
        type: 'error',
        title: 'Remover Etapa',
        description: `Deseja deletar a etapa '${found?.name}' do torneio?`,
        onConfirm: async closeCallback => {
          await onConfirmDelete?.(id)
          closeCallback?.()
        }
      })
    },
    [data, createAlert, onConfirmDelete]
  )

  const props: ListTournamentStageViewProps = { data, isLoading, onEdit, onDelete: handleDelete }
  return React.createElement(ListTournamentStageView, props)
}
