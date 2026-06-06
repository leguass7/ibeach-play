import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import ModalClassroom from '../modal-classroom'
import ListClassroom from './list-classroom'
import type { ClickEditHandler } from './list-classroom'

export type CarListClassroomViewProps = {
  openForm: number
  loading: boolean
  onClickNew: () => void
  onClickRefresh: () => void
  onClickClose: () => void
  onClickEdit: ClickEditHandler
}

export function CarListClassroomView({ loading, onClickNew, onClickRefresh, onClickClose, onClickEdit, openForm }: CarListClassroomViewProps) {
  return (
    <>
      <ModalClassroom isOpen={!!openForm} onClose={onClickClose} classroomId={openForm} />
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="md">Turmas</Heading>
              </Box>
            </Flex>
            <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={onClickNew} />
            <IconButton colorScheme="gray" aria-label="Atualizar" icon={<FiRefreshCcw />} onClick={onClickRefresh} isDisabled={!!loading} />
          </Flex>
        </CardHeader>
        <CardBody>
          <ListClassroom onEdit={onClickEdit} />
        </CardBody>
      </Card>
    </>
  )
}
