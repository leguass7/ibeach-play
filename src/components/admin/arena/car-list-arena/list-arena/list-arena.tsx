import React from 'react'

import { List } from '@chakra-ui/react'
import { SkeletonListItem } from '@ui/skeleton-list-item'

import type { ArenaDTO } from '~/use-cases/arena'

import { ListItemArena, type ClickEditHandler } from './ListItemArena'

export type { ClickEditHandler }

export type ListArenaViewProps = {
  arenas: ArenaDTO[]
  isLoading: boolean
  onEdit: ClickEditHandler
  onDelete: ClickEditHandler
}

export function ListArenaView({ arenas, isLoading, onEdit, onDelete }: ListArenaViewProps) {
  if (isLoading) return <SkeletonListItem />

  return (
    <>
      <List spacing={3}>
        {arenas.map(arena => (
          <ListItemArena {...arena} onEdit={onEdit} key={arena.id} onDelete={onDelete} />
        ))}
      </List>
      {!isLoading && !arenas?.length ? <p>Nenhuma arena cadastrada</p> : null}
    </>
  )
}
