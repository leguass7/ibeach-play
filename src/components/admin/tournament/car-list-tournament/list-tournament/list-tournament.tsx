import React from 'react'

import { List } from '@chakra-ui/react'
import { SkeletonListItem } from '@ui/skeleton-list-item'

import type { TournamentDTO } from '~/use-cases/tournament'

import { ListItemTournament, type ClickEditHandler } from './ListItemTournament'

export type { ClickEditHandler }

export type ListTournamentViewProps = {
  data: TournamentDTO[]
  isLoading: boolean
  onEdit: ClickEditHandler
  onDelete: ClickEditHandler
}

export function ListTournamentView({ data, isLoading, onEdit, onDelete }: ListTournamentViewProps) {
  if (isLoading) return <SkeletonListItem />
  return (
    <List spacing={3}>
      {data.map(item => (
        <ListItemTournament {...item} onEdit={onEdit} key={item.id} onDelete={onDelete} />
      ))}
      {!isLoading && !data?.length ? <p>Nenhum torneio cadastrado</p> : null}
    </List>
  )
}
