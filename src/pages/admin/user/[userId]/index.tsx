import React from 'react'

import { AdminUser } from '@/components/admin/user/AdminUser'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { tryInteger } from '@/helpers/number'
import type { GetServerSideProps, NextPage } from 'next'
import { getServerSession } from 'next-auth'

import { authOptions } from '~/use-cases/auth/auth.options'
import type { UserDTO } from '~/use-cases/user'

type Props = {
  userId?: number | null
  user?: UserDTO
}

const PageUser: NextPage<Props> = ({ userId }) => {
  return (
    <LayoutContainer>
      <AdminUser userId={userId} />
    </LayoutContainer>
  )
}

export default PageUser

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions)
  if (!session?.user) return { redirect: { destination: '/login', permanent: false } }

  const userId = tryInteger(ctx.params?.userId as string)
  if (!userId) return { notFound: true }

  return {
    props: { userId, session }
  }
}
