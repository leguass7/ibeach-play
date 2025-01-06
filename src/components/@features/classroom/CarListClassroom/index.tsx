import React from 'react'
import { FiPlus } from 'react-icons/fi'

import { Box, Card, CardBody, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

import { ModalClassroom } from '../ModalClassroom'

export const CarListClassroom: React.FC = () => {
  const [openForm, setOpenForm] = React.useState(0)

  const handleClickNew = () => {
    setOpenForm(-1)
  }

  const handleClickClose = () => {
    setOpenForm(0)
  }

  return (
    <>
      <ModalClassroom isOpen={!!openForm} onClose={handleClickClose} />
      <Card>
        <CardHeader>
          <Flex gap={4}>
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="md">Turmas</Heading>
              </Box>
            </Flex>
            <IconButton colorScheme="gray" aria-label="See menu" icon={<FiPlus />} onClick={handleClickNew} />
          </Flex>
        </CardHeader>
        <CardBody>{/** ClassroomList */}</CardBody>
      </Card>
    </>
  )
}
