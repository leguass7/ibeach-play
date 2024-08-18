import { tryDate } from '@/helpers/date'
import type { Session } from '@prisma/client'
import type { AdapterSession } from 'next-auth/adapters'

import type { SessionDTO } from './session.dto'

export function sessionToAdapterSession(session?: SessionDTO | AdapterSession | Session | null): AdapterSession | null {
  if (!session) return null
  const result: AdapterSession = {
    expires: tryDate(session?.expires) as Date,
    sessionToken: session.sessionToken || '',
    userId: session.userId ? `${session.userId}` : ''
  }

  return result
}
