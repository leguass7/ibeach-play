import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  [x: string]: unknown
  session: Session
}

const PageAdminTournamentStage: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <h1>Etapa do torneio</h1>
    </LayoutContainer>
  )
}

export default PageAdminTournamentStage

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
