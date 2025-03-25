import React from 'react'

import { useAlert } from '@/components/Alert'
import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useAdminArenaList } from '@/services/api/admin/arena/useAdminArena'
import { List } from '@chakra-ui/react'

import { ListItemArena, type ClickEditHandler } from './ListItemArena'

export type { ClickEditHandler }
type Props = {
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListArena: React.FC<Props> = ({ onEdit, onConfirmDelete }) => {
  const [arenas, isLoading] = useAdminArenaList()
  const { createAlert } = useAlert()

  const handleDelete: ClickEditHandler = id => {
    const found = arenas.find(arena => arena.id === id)
    console.log(id, found)
    createAlert({
      type: 'error',
      title: `Remover Arena`,
      description: `Deseja deletar a arena '${found?.name}'?`,
      onConfirm: async closeCallback => {
        if (onConfirmDelete) await onConfirmDelete?.(id)
        closeCallback?.()
      }
    })
  }

  if (isLoading) return <SkeletonListItem />

  return (
    <>
      <List spacing={3}>
        {arenas.map(arenas => (
          <ListItemArena {...arenas} onEdit={onEdit} key={arenas.id} onDelete={handleDelete} />
        ))}
      </List>
      {!isLoading && !arenas?.length ? <p>Nenhuma arena cadastrada</p> : null}
    </>
  )
}
