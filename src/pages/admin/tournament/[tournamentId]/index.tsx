import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  [x: string]: unknown
  session: Session
}

const PageAdminTournamentOne: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <h1>Admin Tournament One</h1>
    </LayoutContainer>
  )
}

export default PageAdminTournamentOne

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  // validação de administrador
  if (!session?.groups?.includes(1)) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
