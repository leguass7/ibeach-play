import React from 'react'

import { useAlert } from '@/components/alert'
import { useAdminTournamentList } from '@/services/api/admin/tournament/useAdminTournament'

import { ListTournamentView, type ListTournamentViewProps, type ClickEditHandler } from './list-tournament'

type ContainerProps = {
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListTournamentContainer: React.FC<ContainerProps> = ({ onEdit, onConfirmDelete }) => {
  const [data, isLoading] = useAdminTournamentList()
  const { createAlert } = useAlert()

  const handleDelete = React.useCallback<ClickEditHandler>(
    id => {
      const found = data.find(item => item.id === id)
      createAlert({
        type: 'error',
        title: 'Remover Torneio',
        description: `Deseja deletar o torneio '${found?.name}'?`,
        onConfirm: async closeCallback => {
          await onConfirmDelete?.(id)
          closeCallback?.()
        }
      })
    },
    [data, createAlert, onConfirmDelete]
  )

  const props: ListTournamentViewProps = { data, isLoading, onEdit, onDelete: handleDelete }
  return React.createElement(ListTournamentView, props)
}
