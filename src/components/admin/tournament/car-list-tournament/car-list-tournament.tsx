import React from 'react'

import { Card, CardBody } from '@chakra-ui/react'
import { CardListHeader } from '@ui/card-list-header'

import ModalTournament from '../modal-tournament'
import ListTournament from './list-tournament'
import type { ClickEditHandler } from './list-tournament'

export type CarListTournamentViewProps = {
  openForm: number
  loading: boolean
  onClickNew: () => void
  onClickRefresh: () => void
  onClickClose: () => void
  onClickEdit: ClickEditHandler
  onSuccess: () => Promise<void>
  onConfirmDelete: ClickEditHandler
}

export function CarListTournamentView({
  openForm,
  loading,
  onClickNew,
  onClickRefresh,
  onClickClose,
  onClickEdit,
  onSuccess,
  onConfirmDelete
}: CarListTournamentViewProps) {
  return (
    <>
      <ModalTournament isOpen={!!openForm} onClose={onClickClose} tournamentId={openForm} onSuccess={onSuccess} />
      <Card>
        <CardListHeader onClickNew={onClickNew} onClickRefresh={onClickRefresh} loading={loading} title="Torneios" />
        <CardBody>
          <ListTournament onEdit={onClickEdit} onConfirmDelete={onConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
