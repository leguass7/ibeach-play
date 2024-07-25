import type { Session, User } from '@prisma/client'
import type { SessionDTO } from './session.dto'
import type { AdapterSession } from 'next-auth/adapters'
import { tryDate } from '@/helpers/date'

export function sessionToAdapterSession(session?: SessionDTO | AdapterSession | Session | null): AdapterSession | null {
  if (!session) return null
  const result: AdapterSession = {
    expires: tryDate(session?.expires) as Date,
    sessionToken: session.sessionToken || '',
    userId: session.userId ? `${session.userId}` : ''
  }

  return result
}