'use server'
import { authOptions } from '@/@server-side/use-cases/auth/auth.options'
import type { GetServerSidePropsContext, NextPage } from 'next'
import { getServerSession, type Session } from 'next-auth'

export type ProtectedNextPage<Props = Record<string, unknown>> = NextPage<Props & { session?: Session }>

type Params = Pick<GetServerSidePropsContext, 'req' | 'res'> & Partial<GetServerSidePropsContext>

export function tryServerSideSession(ctx: Params) {
  const session = getServerSession(ctx.req, ctx.res, authOptions)
  return session
}
