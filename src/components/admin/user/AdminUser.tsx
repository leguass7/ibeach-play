import React from 'react'

import type { UserDTO } from '@/@server-side/use-cases/user'
import { useOnceCall } from '@/hooks/useOnceCall'
import { getUser } from '@/services/api/user'

type Props = {
  userId?: number | null
}

export const AdminUser: React.FC<Props> = ({ userId }) => {
  const [data, setData] = React.useState<UserDTO | null>(null)

  const fetchData = React.useCallback(async () => {
    if (userId) {
      const response = await getUser(userId)
      if (response?.success) setData(response?.user || null)
    }
  }, [userId])

  useOnceCall(fetchData)

  return (
    <div>
      {data
        ? Object.entries(data).map(([key, value]) => {
            return (
              <div key={key}>
                <strong>{key}:</strong> {JSON.stringify(value)}
              </div>
            )
          })
        : null}
    </div>
  )
}
