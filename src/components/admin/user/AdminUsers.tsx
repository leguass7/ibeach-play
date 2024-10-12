import React from 'react'

import { ChakraTable } from '@/components/table'
import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { paginateUsers } from '@/services/api/user'
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export const AdminUsers: React.FC = () => {
  const [paginate, loading, data] = useFetcher(paginateUsers)

  useOnceCall(() => paginate({ test: true }))

  console.log('data', data)

  return (
    <SimpleGrid>
      <GridItem>
        <h1>Users</h1>
      </GridItem>
      <GridItem>
        <ChakraTable loading={!!loading} records={data?.users || []} />
      </GridItem>
    </SimpleGrid>
  )
}
