import { authOptions } from '@/@server-side/use-cases/auth/auth.options'
import { AdminUsers } from '@/components/admin/user/AdminUsers'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Stack, VStack } from '@chakra-ui/react'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'

type Props = {
  [x: string]: unknown
}

const PageUser: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <Stack>
        <VStack minHeight="100vh" justify="flex-start" align="center" px={{ base: 0, md: '100px' }} marginTop={16} spacing={6}>
          <AdminUsers />
        </VStack>
      </Stack>
    </LayoutContainer>
  )
}

export default PageUser

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  // if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
