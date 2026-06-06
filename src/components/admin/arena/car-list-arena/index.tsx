import React from 'react'

import { CardListHeader } from '@/components/admin/CardListHeader'
import { useAdminArena } from '@/services/api/admin/arena/useAdminArena'
import { Card, CardBody } from '@chakra-ui/react'

import { ModalArena } from '../ModalArena'
import { ListArena, type ClickEditHandler } from './ListArena'

export const CarListArena: React.FC = () => {
  const { list, loading, remove } = useAdminArena()
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
      <ModalArena isOpen={!!openForm} onClose={handleClickClose} arenaId={openForm} onSuccess={handleSuccess} />
      <Card>
        <CardListHeader onClickNew={handleClickNew} onClickRefresh={list} loading={loading} title="Arenas" />
        <CardBody>
          <ListArena onEdit={handleClickEdit} onConfirmDelete={handleConfirmDelete} />
        </CardBody>
      </Card>
    </>
  )
}
