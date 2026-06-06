import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation'
import { LayoutContainer } from '@/components/layout/layout-container'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'
import dynamic from 'next/dynamic'

import { authOptions } from '~/use-cases/auth/auth.options'

const AdminUsers = dynamic(() => import('@/components/admin/user/AdminUsers').then(ctx => ctx.AdminUsers), { ssr: false })

type Props = {
  [x: string]: unknown
  session: Session
}

const PageUser: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <AdminUsers />
    </LayoutContainer>
  )
}

export default PageUser

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  // validação de administrador
  if (!session?.groups?.includes(1)) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
