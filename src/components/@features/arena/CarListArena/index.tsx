import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { useAdminArena } from '@/services/api/admin/arena/useAdminArena'
import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import { ModalArena } from '../ModalArena'
import { ListArena, type ClickEditHandler } from './ListArena'

export const CarListArena: React.FC = () => {
  const { list, loading } = useAdminArena()
  const [openForm, setOpenForm] = React.useState(0)

  const handleClickNew = () => {
    setOpenForm(-1)
  }

  const handleClickClose = () => {
    setOpenForm(0)
  }

  const handleClickEdit: ClickEditHandler = id => {
    setOpenForm(+id)
  }

  const handleSuccess = async () => {
    setOpenForm(0)
    list()
  }

  return (
    <>
      <ModalArena isOpen={!!openForm} onClose={handleClickClose} arenaId={openForm} onSuccess={handleSuccess} />
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="md">Arenas</Heading>
              </Box>
            </Flex>
            <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={handleClickNew} />
            <IconButton colorScheme="gray" aria-label="Atualizar" icon={<FiRefreshCcw />} onClick={list} isDisabled={!!loading} />
          </Flex>
        </CardHeader>
        <CardBody>
          <ListArena onEdit={handleClickEdit} />
        </CardBody>
      </Card>
    </>
  )
}
