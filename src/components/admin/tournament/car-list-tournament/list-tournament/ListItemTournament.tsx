import React from 'react'

import type { TournamentDTO } from '@/@server-side/use-cases/tournament'
import { AvatarListItem } from '@/components/admin/AvatarListItem'

export type ClickEditHandler = (id: string | number) => void

type Props = Partial<TournamentDTO> & {
  onEdit?: ClickEditHandler
  onDelete?: ClickEditHandler
}

export const ListItemTournament: React.FC<Props> = ({ id, onEdit, onDelete, name }) => {
  const handleClickEdit = () => {
    if (id && onEdit) onEdit?.(id)
  }

  const handleClickDelete = () => {
    if (id && onDelete) onDelete?.(id)
  }

  const link = `/admin/tournament/${id}`

  return <AvatarListItem onEdit={handleClickEdit} onDelete={handleClickDelete} avatar={name} title={name} link={link} />
}
