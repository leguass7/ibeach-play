import React from 'react'

import { ChakraTable } from '@/components/table'
import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import { paginateUsers } from '@/services/api/user'
import { Card, CardBody, CardHeader, GridItem, Heading, SimpleGrid } from '@chakra-ui/react'

import { AdminBreadcrumb } from '../AdminBreadcrumb'

export const AdminUsers: React.FC = () => {
  const [paginate, loading, data] = useFetcher(paginateUsers)

  useOnceCall(() => paginate({ test: true }))

  return (
    <SimpleGrid gap={2}>
      <GridItem>
        <AdminBreadcrumb paths={[{ label: 'Usuários' }]} />
      </GridItem>
      <GridItem overflowX={'hidden'}>
        <Card>
          <CardHeader>
            <Heading size="md">Usuários</Heading>
          </CardHeader>
          <CardBody>
            <ChakraTable loading={!!loading} records={data?.users || []} tableProps={{ size: 'sm' }} />
          </CardBody>
        </Card>
      </GridItem>
    </SimpleGrid>
  )
}
