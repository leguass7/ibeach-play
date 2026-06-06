import React from 'react'

import type { TournamentDTO } from '@/@server-side/use-cases/tournament'
import { AvatarListItem } from '@/components/ui/avatar-list-item'
import { useRouter } from 'next/navigation'

export type ClickEditHandler = (id: string | number) => void

type Props = Partial<TournamentDTO> & {
  onEdit?: ClickEditHandler
  onDelete?: ClickEditHandler
}

export const ListItemTournament: React.FC<Props> = ({ id, onEdit, onDelete, name }) => {
  const router = useRouter()

  const handleClickEdit = () => {
    if (id && onEdit) onEdit?.(id)
  }

  const handleClickDelete = () => {
    if (id && onDelete) onDelete?.(id)
  }

  const handleClickLink = () => router.push(`/admin/tournament/${id}`)

  return <AvatarListItem onEdit={handleClickEdit} onDelete={handleClickDelete} onLink={handleClickLink} avatar={name} title={name} />
}
