import { AdminTournamentStages } from '@/components/admin/tournament-stage/AdminTournamentStages'
import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  [x: string]: unknown
  session: Session
  tournamentId: number
}

const PageAdminTournamentOne: NextPage<Props> = ({ tournamentId }) => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <AdminTournamentStages tournamentId={tournamentId} />
    </LayoutContainer>
  )
}

export default PageAdminTournamentOne

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  // validação de administrador
  if (!session?.groups?.includes(1)) return { redirect: { destination: '/login', permanent: false } }

  const tournamentId = Number(ctx.params?.tournamentId)

  return {
    props: { session, tournamentId }
  }
}
