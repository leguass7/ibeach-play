'use client'
import React from 'react'
import { FiEdit2, FiTrash } from 'react-icons/fi'

import type { TournamentDTO } from '@/@server-side/use-cases/tournament'
import { Avatar, Flex, IconButton, ListItem, Text } from '@chakra-ui/react'

export type ClickEditHandler = (id: string | number) => void

type Props = Partial<TournamentDTO> & {
  onEdit: ClickEditHandler
}

export const ListItemTournament: React.FC<Props> = ({ id, onEdit, name }) => {
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
      <Avatar size="md" name={name || '--'} />
      <Flex direction={'column'} flex={1}>
        <Flex gap={2}>
          <Text as={'span'} fontWeight="bold" flex={1}>
            {name}
          </Text>
          <IconButton aria-label="Editar torneio" icon={<FiEdit2 />} size="sm" variant="outline" onClick={handleClickEdit} />
          <IconButton aria-label="Remover torneio" icon={<FiTrash />} size="sm" variant="outline" />
        </Flex>
      </Flex>
    </ListItem>
  )
}
