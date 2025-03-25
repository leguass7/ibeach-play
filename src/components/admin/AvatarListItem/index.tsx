import React from 'react'
import { FiTrash, FiEdit2 } from 'react-icons/fi'

import { Avatar, Flex, IconButton, ListItem, Text } from '@chakra-ui/react'

export type ClickButtonHandler = () => void | Promise<void>

export type AvatarListItemProps = {
  onEdit?: ClickButtonHandler
  onDelete?: ClickButtonHandler
  avatar?: string
  title?: string
}

export const AvatarListItem: React.FC<AvatarListItemProps> = ({ onDelete, onEdit, avatar, title }) => {
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
      {avatar ? <Avatar size="md" name={title || '--'} /> : null}
      <Flex direction={'column'} flex={1}>
        <Flex gap={2}>
          <Text as={'span'} fontWeight="bold" flex={1}>
            {title}
          </Text>
          {onEdit ? <IconButton aria-label="Editar turma" icon={<FiEdit2 />} size="sm" variant="outline" onClick={onEdit} /> : null}
          {onDelete ? <IconButton aria-label="Remover turma" icon={<FiTrash />} size="sm" variant="outline" onClick={onDelete} /> : null}
        </Flex>
      </Flex>
    </ListItem>
  )
}
