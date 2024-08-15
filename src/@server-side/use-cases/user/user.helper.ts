import type { User } from '@prisma/client'
import type { AdapterUser } from 'next-auth/adapters'

import type { UserDTO } from './user.dto'

export function userToAdapterUser(user?: UserDTO | AdapterUser | User): AdapterUser | null {
  if (!user) return null

  const result: AdapterUser = {
    ...user,
    id: user.id ? `${user.id}` : '',
    email: user?.email || '',
    name: user?.name || null,
    emailVerified: user?.emailVerified || null
  }

  return result
}
