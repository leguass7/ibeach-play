import React from 'react'

import { paginateUsers } from './admin-user.api'
import type { IUserResponse, UserPaginateParams } from './user.interface'

export type PaginateUserHandler = (params?: UserPaginateParams | null) => Promise<IUserResponse | null>

/** @deprecated */
export function useAdminUser() {
  const [loading, setLoading] = React.useState(false)

  const paginate = React.useCallback(async () => {
    setLoading(true)
    const paginated = await paginateUsers()
    setLoading(false)
    return paginated
  }, [])

  return { paginate, loading }
}
