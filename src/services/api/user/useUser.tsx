// import { apiService } from '@/services/api/api.service'
// import useSWR from 'swr'

import React from 'react'

import { paginateUsers } from './admin-user.api'

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
