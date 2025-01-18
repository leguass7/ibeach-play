import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  [x: string]: unknown
}

const PageCoachStudent: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <SimpleGrid gap={5} columns={{ base: 1 }}>
        <GridItem>{''}</GridItem>
      </SimpleGrid>
    </LayoutContainer>
  )
}

export default PageCoachStudent

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
