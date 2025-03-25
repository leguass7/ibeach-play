import React from 'react'
import { FiPlus, FiRefreshCcw } from 'react-icons/fi'

import { Box, CardHeader, Flex, Heading, IconButton } from '@chakra-ui/react'

type CardListHeaderProps = {
  onClickNew?: () => void
  onClickRefresh?: () => void
  loading?: boolean
  title?: string
}

export const CardListHeader: React.FC<CardListHeaderProps> = ({ onClickNew, onClickRefresh, loading, title }) => {
  return (
    <CardHeader>
      <Flex gap={4}>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>{title ? <Heading size="md">{title}</Heading> : null}</Box>
        </Flex>
        <IconButton colorScheme="gray" aria-label="Adicionar" icon={<FiPlus />} onClick={onClickNew} isDisabled={!!loading || !onClickNew} />
        <IconButton
          colorScheme="gray"
          aria-label="Atualizar"
          icon={<FiRefreshCcw />}
          onClick={onClickRefresh}
          isDisabled={!!loading || !onClickRefresh}
        />
      </Flex>
    </CardHeader>
  )
}
