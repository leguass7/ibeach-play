import React from 'react'

import { CardListHeader } from '@/components/ui/card-list-header'
import { useAdminTournamentStage } from '@/services/api/admin/tournament-stage/useAdminTournamentStage'
import { Card, CardBody } from '@chakra-ui/react'

import { ModalTournamentStage } from '../modal-tournament-stage'
import { ListTournamentStage, type ClickEditHandler } from './list-tournament-stage'

type Props = {
  tournamentId: number
}
export const CarListTournamentStage: React.FC<Props> = ({ tournamentId }) => {
  const { list, loading, remove } = useAdminTournamentStage(tournamentId)
  const [openForm, setOpenForm] = React.useState(0)

  const handleClickNew = () => setOpenForm(-1)
  const handleClickClose = () => setOpenForm(0)
  const handleClickEdit: ClickEditHandler = id => setOpenForm(+id)

  const handleSuccess = async () => {
    setOpenForm(0)
    list()
  }

  const handleConfirmDelete = React.useCallback<ClickEditHandler>(
    async id => {
      await remove(id as number)
      setOpenForm(0)
      list()
    },
    [list, remove]
  )

  return (
    <>
      <ModalTournamentStage
        isOpen={!!openForm}
        onClose={handleClickClose}
        tournamentId={tournamentId}
        tournamentStageId={openForm}
        onSuccess={handleSuccess}
      />
      <Card>
        <CardListHeader onClickNew={handleClickNew} onClickRefresh={list} loading={loading} title="Etapas do Torneio" />
        <CardBody>
          <ListTournamentStage tournamentId={tournamentId} onEdit={handleClickEdit} onConfirmDelete={handleConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
