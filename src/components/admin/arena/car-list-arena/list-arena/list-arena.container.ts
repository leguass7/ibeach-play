import React from 'react'

import { useAlert } from '@/components/alert'
import { useAdminArenaList } from '@/services/api/admin/arena/useAdminArena'

import { ListArenaView, type ListArenaViewProps, type ClickEditHandler } from './list-arena'

type ContainerProps = {
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListArenaContainer: React.FC<ContainerProps> = ({ onEdit, onConfirmDelete }) => {
  const [arenas, isLoading] = useAdminArenaList()
  const { createAlert } = useAlert()

  const handleDelete = React.useCallback<ClickEditHandler>(
    id => {
      const found = arenas.find(arena => arena.id === id)
      createAlert({
        type: 'error',
        title: 'Remover Arena',
        description: `Deseja deletar a arena '${found?.name}'?`,
        onConfirm: async closeCallback => {
          await onConfirmDelete?.(id)
          closeCallback?.()
        }
      })
    },
    [arenas, createAlert, onConfirmDelete]
  )

  const props: ListArenaViewProps = { arenas, isLoading, onEdit, onDelete: handleDelete }
  return React.createElement(ListArenaView, props)
}
