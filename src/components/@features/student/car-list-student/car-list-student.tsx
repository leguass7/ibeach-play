import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import ListStudent from './list-student'
import type { ClickEditHandler } from './list-student'

export type CarListStudentViewProps = {
  loading: boolean
  onClickNew: () => void
  onClickRefresh: () => void
  onClickEdit: ClickEditHandler
}

export function CarListStudentView({ loading, onClickNew, onClickRefresh, onClickEdit }: CarListStudentViewProps) {
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="md">Alunos</Heading>
            </Box>
          </Flex>
          <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={onClickNew} />
          <IconButton colorScheme="gray" aria-label="Atualizar" icon={<FiRefreshCcw />} onClick={onClickRefresh} isDisabled={!!loading} />
        </Flex>
      </CardHeader>
      <CardBody>
        <ListStudent onEdit={onClickEdit} />
      </CardBody>
    </Card>
  )
}
