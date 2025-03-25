import React from 'react'

import type { IPerson } from '@/services/api/tournament/person/person.interface'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Tag, Text, Icon } from '@chakra-ui/react'

type PersonRowProps = {
  person: IPerson
}

export default function PersonRow({ person }: PersonRowProps) {
  return (
    <Box display="flex" alignItems="center">
      {person?.isSeeded && <Icon as={StarIcon} color="gold" mr={1} fontSize="16px" />}
      <Text fontSize="sm">{person?.name}</Text>
      <Tag size="sm" colorScheme="blue" variant="outline" ml={1}>
        Peso: {person?.weight}
      </Tag>
    </Box>
  )
}
