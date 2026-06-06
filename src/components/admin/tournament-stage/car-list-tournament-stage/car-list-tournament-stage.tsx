import React from 'react'

import { CardListHeader } from '@/components/ui/card-list-header'
import { Card, CardBody } from '@chakra-ui/react'

import ModalTournamentStage from '../modal-tournament-stage'
import ListTournamentStage from './list-tournament-stage'
import type { ClickEditHandler } from './list-tournament-stage'

export type CarListTournamentStageViewProps = {
  tournamentId: number
  openForm: number
  loading: boolean
  onClickNew: () => void
  onClickRefresh: () => void
  onClickClose: () => void
  onClickEdit: ClickEditHandler
  onSuccess: () => Promise<void>
  onConfirmDelete: ClickEditHandler
}

export function CarListTournamentStageView({
  tournamentId,
  openForm,
  loading,
  onClickNew,
  onClickRefresh,
  onClickClose,
  onClickEdit,
  onSuccess,
  onConfirmDelete
}: CarListTournamentStageViewProps) {
  return (
    <>
      <ModalTournamentStage
        isOpen={!!openForm}
        onClose={onClickClose}
        tournamentId={tournamentId}
        tournamentStageId={openForm}
        onSuccess={onSuccess}
      />
      <Card>
        <CardListHeader onClickNew={onClickNew} onClickRefresh={onClickRefresh} loading={loading} title="Etapas do Torneio" />
        <CardBody>
          <ListTournamentStage tournamentId={tournamentId} onEdit={onClickEdit} onConfirmDelete={onConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
