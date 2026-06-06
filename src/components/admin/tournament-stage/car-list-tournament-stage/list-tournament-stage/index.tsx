import React from 'react'

import { useAlert } from '@/components/alert'
import { SkeletonListItem } from '@/components/ui/skeleton-list-item'
import { useAdminTournamentStageList } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'
import { List } from '@chakra-ui/react'

import { ListItemTournamentStage, type ClickEditHandler } from './ListItemTournamentStage'

export type { ClickEditHandler }

type Props = {
  tournamentId: number
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListTournamentStage: React.FC<Props> = ({ onEdit, onConfirmDelete, tournamentId }) => {
  const [data, isLoading] = useAdminTournamentStageList(tournamentId)
  const { createAlert } = useAlert()

  const handleDelete: ClickEditHandler = id => {
    const found = data.find(data => data.id === id)
    createAlert({
      type: 'error',
      title: `Remover Etapa`,
      description: `Deseja deletar a etapa '${found?.name}' do torneio?`,
      onConfirm: async closeCallback => {
        if (onConfirmDelete) await onConfirmDelete?.(id)
        closeCallback?.()
      }
    })
  }

  if (isLoading) return <SkeletonListItem />

  return (
    <List spacing={3}>
      {data.map(data => (
        <ListItemTournamentStage {...data} onEdit={onEdit} key={data.id} onDelete={handleDelete} />
      ))}
      {!isLoading && !data?.length ? <p>Nenhuma etapa cadastrada para torneio</p> : null}
    </List>
  )
}
