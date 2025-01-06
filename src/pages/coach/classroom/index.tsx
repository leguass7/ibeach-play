import { CarListClassroom } from '@/components/@features/classroom/CarListClassroom'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  [x: string]: unknown
}

const PageCoachDash: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <SimpleGrid gap={5} columns={{ base: 1 }}>
        <GridItem>
          <CarListClassroom />
        </GridItem>
      </SimpleGrid>
    </LayoutContainer>
  )
}

export default PageCoachDash

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
