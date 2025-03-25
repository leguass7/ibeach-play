import React from 'react'

import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { CarListTournament } from './CarListTournament'

export const AdminTournaments: React.FC = () => {
  return (
    <SimpleGrid gap={5} columns={{ base: 1 }}>
      <GridItem>
        <CarListTournament />
      </GridItem>
    </SimpleGrid>
  )
}
