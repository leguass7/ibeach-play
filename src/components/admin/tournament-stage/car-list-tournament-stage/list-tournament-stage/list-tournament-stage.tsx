import React from 'react'

import { SkeletonListItem } from '@/components/ui/skeleton-list-item'
import { List } from '@chakra-ui/react'

import type { TournamentStageDTO } from '~/use-cases/tournament-stage'

import { ListItemTournamentStage, type ClickEditHandler } from './ListItemTournamentStage'

export type { ClickEditHandler }

export type ListTournamentStageViewProps = {
  data: TournamentStageDTO[]
  isLoading: boolean
  onEdit: ClickEditHandler
  onDelete: ClickEditHandler
}

export function ListTournamentStageView({ data, isLoading, onEdit, onDelete }: ListTournamentStageViewProps) {
  if (isLoading) return <SkeletonListItem />
  return (
    <List spacing={3}>
      {data.map(item => (
        <ListItemTournamentStage {...item} onEdit={onEdit} key={item.id} onDelete={onDelete} />
      ))}
      {!isLoading && !data?.length ? <p>Nenhuma etapa cadastrada para torneio</p> : null}
    </List>
  )
}
