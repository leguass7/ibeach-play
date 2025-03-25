import { authOptions } from '@/@server-side/use-cases/auth/auth.options'
import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import type { GetServerSideProps, NextPage } from 'next/types'

const AdminDash = dynamic(() => import('@/components/admin/AdminDash').then(ctx => ctx.AdminDash), { ssr: false })

type Props = {
  [x: string]: unknown
}

const AdminDashPage: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <AdminDash />
    </LayoutContainer>
  )
}

export default AdminDashPage

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  return {
    props: { session }
  }
}
