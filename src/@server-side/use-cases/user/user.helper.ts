import type { UserDTO } from './user.dto'
import type { AdapterUser } from 'next-auth/adapters'

export function userToAdapterUser(user: UserDTO): AdapterUser {
  const result: AdapterUser = {
    id: user.id ? `${user.id}` : '',
    email: user?.email || '',
    name: user?.name || null,
    emailVerified: user?.emailVerified || null
  }

  return result
}
