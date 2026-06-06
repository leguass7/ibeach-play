import React from 'react'

import { AvatarListItem } from '@/components/admin/AvatarListItem'

import type { ArenaDTO } from '~/use-cases/arena'

export type ClickEditHandler = (id: string | number) => void | Promise<void>

type Props = Partial<ArenaDTO> & {
  onEdit?: ClickEditHandler
  onDelete?: ClickEditHandler
}

export const ListItemArena: React.FC<Props> = ({ id, onEdit, onDelete, name }) => {
  const handleClickEdit = () => {
    if (id && onEdit) onEdit?.(id)
  }

  const handleClickDelete = () => {
    if (id && onDelete) onDelete?.(id)
  }

  return <AvatarListItem onEdit={handleClickEdit} onDelete={handleClickDelete} avatar={name} title={name} />
}
