import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { useCoachClassroom } from '@/services/api/coach/useCoachClassroom'
import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import { ModalClassroom } from '../ModalClassroom'
import { ListClassroom, type ClickEditHandler } from './ListClassroom'

export const CarListClassroom: React.FC = () => {
  const { list, loading } = useCoachClassroom()
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
      <ModalClassroom isOpen={!!openForm} onClose={handleClickClose} classroomId={openForm} />
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="md">Turmas</Heading>
              </Box>
            </Flex>
            <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={handleClickNew} />
            <IconButton colorScheme="gray" aria-label="Atalizar" icon={<FiRefreshCcw />} onClick={list} isDisabled={!!loading} />
          </Flex>
        </CardHeader>
        <CardBody>
          <ListClassroom onEdit={handleClickEdit} />
        </CardBody>
      </Card>
    </>
  )
}
