import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { useCoachStudent } from '@/services/api/coach/student/useCoachStudent'
import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import { ListStudent, type ClickEditHandler } from './ListStudent'

export const CarListStudent: React.FC = () => {
  const { list, loading } = useCoachStudent()
  const [, setOpenForm] = React.useState(0)

  const handleClickNew = () => {
    setOpenForm(-1)
  }

  const handleClickEdit: ClickEditHandler = React.useCallback(id => {
    setOpenForm(+id)
  }, [])

  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Box>
              <Heading size="md">Alunos</Heading>
            </Box>
          </Flex>
          <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={handleClickNew} />
          <IconButton colorScheme="gray" aria-label="Atalizar" icon={<FiRefreshCcw />} onClick={list} isDisabled={!!loading} />
        </Flex>
      </CardHeader>
      <CardBody>
        <ListStudent onEdit={handleClickEdit} />
      </CardBody>
    </Card>
  )
}
