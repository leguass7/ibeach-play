import React from 'react'

import { AvatarListItem } from '@/components/admin/AvatarListItem'

import type { TournamentStageDTO } from '~/use-cases/tournament-stage'

export type ClickEditHandler = (id: string | number) => void | Promise<void>

type Props = Partial<TournamentStageDTO> & {
  onEdit?: ClickEditHandler
  onDelete?: ClickEditHandler
}

export const ListItemTournamentStage: React.FC<Props> = ({ id, onEdit, onDelete, name, tournamentId }) => {
  const handleClickEdit = () => {
    if (id && onEdit) onEdit?.(id)
  }

  const handleClickDelete = () => {
    if (id && onDelete) onDelete?.(id)
  }

  const link = `/admin/tournament/${tournamentId}/stage/${id}`

  return <AvatarListItem onEdit={handleClickEdit} onDelete={handleClickDelete} avatar={name} title={name} link={link} />
}
