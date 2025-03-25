import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'
import dynamic from 'next/dynamic'

import { authOptions } from '~/use-cases/auth/auth.options'

const AdminTournaments = dynamic(() => import('@/components/admin/tournament/AdminTournaments').then(ctx => ctx.AdminTournaments), { ssr: false })

type Props = {
  [x: string]: unknown
  session: Session
}

const PageAdminTournament: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <AdminTournaments />
    </LayoutContainer>
  )
}

export default PageAdminTournament

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  // validação de administrador
  if (!session?.groups?.includes(1)) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
