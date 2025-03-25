import React from 'react'

import { CarListArena } from '@/components/@features/arena/CarListArena'
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export const AdminArenas: React.FC = () => {
  return (
    <SimpleGrid gap={5} columns={{ base: 1 }}>
      <GridItem>
        <CarListArena />
      </GridItem>
    </SimpleGrid>
  )
}
