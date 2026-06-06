import React from 'react'

import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { CarListTournamentStage } from './car-list-tournament-stage'

type Props = {
  tournamentId: number
}

export const AdminTournamentStages: React.FC<Props> = ({ tournamentId }) => {
  return (
    <SimpleGrid gap={5} columns={{ base: 1 }}>
      <GridItem>
        <CarListTournamentStage tournamentId={tournamentId} />
      </GridItem>
    </SimpleGrid>
  )
}
