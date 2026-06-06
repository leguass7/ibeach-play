import React from 'react'

import { Card, CardBody } from '@chakra-ui/react'
import { CardListHeader } from '@ui/card-list-header'

import ModalArena from '../modal-arena'
import ListArena from './list-arena'
import type { ClickEditHandler } from './list-arena'

export type CarListArenaViewProps = {
  openForm: number
  loading: boolean
  onClickNew: () => void
  onClickRefresh: () => void
  onClickClose: () => void
  onClickEdit: ClickEditHandler
  onSuccess: () => Promise<void>
  onConfirmDelete: ClickEditHandler
}

export function CarListArenaView({
  openForm,
  loading,
  onClickNew,
  onClickRefresh,
  onClickClose,
  onClickEdit,
  onSuccess,
  onConfirmDelete
}: CarListArenaViewProps) {
  return (
    <>
      <ModalArena isOpen={!!openForm} onClose={onClickClose} arenaId={openForm} onSuccess={onSuccess} />
      <Card>
        <CardListHeader onClickNew={onClickNew} onClickRefresh={onClickRefresh} loading={loading} title="Arenas" />
        <CardBody>
          <ListArena onEdit={onClickEdit} onConfirmDelete={onConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
