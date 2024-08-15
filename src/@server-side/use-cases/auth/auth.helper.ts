/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Session } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

import type { IAuthorizedUser } from './auth.dto'

export type JwtOrSession = (JWT | Session) & { level?: number }

export function sessionToAuthorizedDto(data?: Session | null): IAuthorizedUser | null {
  if (!data?.user?.id) return null
  return {
    userId: data?.user?.id,
    name: data?.user?.name || '',
    email: data?.user?.email || '',
    groups: data?.groups || []
  }
}

export function tokenToAuthorizedDto(data?: JWT | null): IAuthorizedUser | null {
  const userId = data?.sub ? +data.sub || 0 : 0
  if (!userId) return null
  return {
    userId,
    name: data?.name || '',
    email: data?.email || '',
    groups: data?.groups || []
  }
}
