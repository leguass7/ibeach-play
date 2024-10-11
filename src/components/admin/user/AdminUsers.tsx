import React from 'react'

import { useOnceCall } from '@/hooks/useOnceCall'
import { useAdminUser } from '@/services/api/user/useUser'

export const AdminUsers: React.FC = () => {
  const { loading, paginate } = useAdminUser()
  // const { data, isLoading } = useAdminUser()
  // console.log('data', isLoading, data)
  const data = []

  useOnceCall(paginate)

  return (
    <div>
      <h1>Users</h1>

      {/* {isLoading && <CircularProgress />} */}
    </div>
  )
}
