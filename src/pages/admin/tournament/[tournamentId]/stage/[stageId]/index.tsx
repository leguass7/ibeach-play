import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation'
import { LayoutContainer } from '@/components/layout/layout-container'
import { TournamentComponentPage } from '@/components/tournament-sorted/tournament-component-page'
import { tryInteger } from '@/helpers/number'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'

type Props = {
  tournamentId: number
  stageId: number
  session: Session
}

const PageAdminTournamentStage: NextPage<Props> = ({ tournamentId, stageId }) => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <TournamentComponentPage tournamentId={tournamentId} stageId={stageId} />
    </LayoutContainer>
  )
}

export default PageAdminTournamentStage

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  const tournamentId = tryInteger(ctx.params?.tournamentId as string)
  if (!tournamentId) return { notFound: true }

  const stageId = tryInteger(ctx.params?.stageId as string)
  if (!stageId) return { notFound: true }

  return {
    props: { session, tournamentId, stageId }
  }
}
