'use client'
import React from 'react'
import { FiEdit2 } from 'react-icons/fi'

import type { ClassroomDTO } from '@/@server-side/use-cases/classroom'
import { Avatar, Flex, IconButton, ListItem, Text } from '@chakra-ui/react'

import { ItemHour } from './ItemHours'

export type ClickEditHandler = (id: string | number) => void

type Props = Partial<ClassroomDTO> & {
  onEdit: ClickEditHandler
}

export const ListItemClassroom: React.FC<Props> = ({ id, label, hours, onEdit }) => {
  const handleClickEdit = () => {
    if (id && onEdit) onEdit?.(id)
  }

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
      <Avatar size="md" name={label} />
      <Flex direction={'column'} flex={1}>
        <Text as={'span'} fontWeight="bold">
          {label}
        </Text>
        <ItemHour hours={hours} />
      </Flex>
      <IconButton aria-label="Editar turma" icon={<FiEdit2 />} size="sm" variant="ghost" onClick={handleClickEdit} />
    </ListItem>
  )
}
