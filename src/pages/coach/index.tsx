import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'

import { authOptions } from '~/use-cases/auth/auth.options'

const CoachDash = dynamic(() => import('@/components/coach/CoachDash').then(ctx => ctx.CoachDash), { ssr: false })

type Props = {
  [x: string]: unknown
}

const PageCoachDash: NextPage<Props> = () => {
  return (
    <LayoutContainer>
      <CoachDash />
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
