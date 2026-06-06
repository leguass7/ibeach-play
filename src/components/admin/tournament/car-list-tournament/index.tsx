import React from 'react'

import { CardListHeader } from '@/components/admin/CardListHeader'
import { ModalTournament } from '@/components/admin/tournament/ModalTournament'
import { useAdminTournament } from '@/services/api/admin/tournament/useAdminTournament'
import { Card, CardBody } from '@chakra-ui/react'

import { ListTournament, type ClickEditHandler } from './ListTournament'

export const CarListTournament: React.FC = () => {
  const { list, loading, remove } = useAdminTournament()
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
      <ModalTournament isOpen={!!openForm} onClose={handleClickClose} tournamentId={openForm} onSuccess={handleSuccess} />
      <Card>
        <CardListHeader onClickNew={handleClickNew} onClickRefresh={list} loading={loading} title="Torneios" />
        <CardBody>
          <ListTournament onEdit={handleClickEdit} onConfirmDelete={handleConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
