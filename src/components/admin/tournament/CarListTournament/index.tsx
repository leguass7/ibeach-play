import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { ModalTournament } from '@/components/@features/arena/ModalTournament'
import { useAdminTournament } from '@/services/api/admin/tournament/useAdminTournament'
import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import { ListTournament, type ClickEditHandler } from './ListTournament'

export const CarListTournament: React.FC = () => {
  const { list, loading } = useAdminTournament()
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

  return (
    <>
      <ModalTournament isOpen={!!openForm} onClose={handleClickClose} tournamentId={openForm} />
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="md">Torneios</Heading>
              </Box>
            </Flex>
            <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={handleClickNew} />
            <IconButton colorScheme="gray" aria-label="Atualizar" icon={<FiRefreshCcw />} onClick={list} isDisabled={!!loading} />
          </Flex>
        </CardHeader>
        <CardBody>
          <ListTournament onEdit={handleClickEdit} />
        </CardBody>
      </Card>
    </>
  )
}
