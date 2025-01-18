'use client'
import React from 'react'
import { FiTrash, FiEdit2 } from 'react-icons/fi'

import type { StudentDTO } from '@/@server-side/use-cases/student'
import { Avatar, Flex, IconButton, ListItem, Text } from '@chakra-ui/react'

export type ClickEditHandler = (id: string | number) => void

type Props = Partial<StudentDTO> & {
  onEdit: ClickEditHandler
}

export const ListItemStudent: React.FC<Props> = ({ onEdit, studentId, student }) => {
  const handleClickEdit = () => {
    if (studentId && onEdit) onEdit?.(studentId)
  }

  const name = student?.name || '--'

  return (
    <ListItem
      p={4}
      borderWidth={1}
      borderRadius="md"
      display="flex"
      gap={4}
      justifyContent="flex-start"
      alignItems="center"
      _hover={{ bg: 'gray.50' }}
    >
      <Avatar size="md" name={name} />
      <Flex direction={'column'} flex={1}>
        <Flex gap={2}>
          <Text as={'span'} fontWeight="bold" flex={1}>
            {name}
          </Text>
          <IconButton aria-label="Editar turma" icon={<FiEdit2 />} size="sm" variant="outline" onClick={handleClickEdit} />
          <IconButton aria-label="Remover turma" icon={<FiTrash />} size="sm" variant="outline" />
        </Flex>
      </Flex>
    </ListItem>
  )
}
