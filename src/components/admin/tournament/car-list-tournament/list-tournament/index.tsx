import React from 'react'

import { useAlert } from '@/components/Alert'
import { SkeletonListItem } from '@/components/SkeletonListItem'
import { useAdminTournamentList } from '@/services/api/admin/tournament/useAdminTournament'
import { List } from '@chakra-ui/react'

import { ListItemTournament, type ClickEditHandler } from './ListItemTournament'

export type { ClickEditHandler }

type Props = {
  onEdit: ClickEditHandler
  onConfirmDelete: ClickEditHandler
}

export const ListTournament: React.FC<Props> = ({ onEdit, onConfirmDelete }) => {
  const [data, isLoading] = useAdminTournamentList()
  const { createAlert } = useAlert()

  const handleDelete: ClickEditHandler = id => {
    const found = data.find(data => data.id === id)
    createAlert({
      type: 'error',
      title: `Remover Torneio`,
      description: `Deseja deletar a torneio '${found?.name}'?`,
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
        <ListItemTournament {...data} onEdit={onEdit} key={data.id} onDelete={handleDelete} />
      ))}
      {!isLoading && !data?.length ? <p>Nenhum torneio cadastrado</p> : null}
    </List>
  )
}
