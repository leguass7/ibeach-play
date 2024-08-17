import React from 'react'

import { AdminUsers } from '@/components/admin/Users'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

type Props = {
  [x: string]: unknown
}

const PageUser: NextPage<Props> = () => {
  const { data } = useSession()

  return (
    <div>
      <AdminUsers />
      <p>{JSON.stringify(data)}</p>
    </div>
  )
}

export default PageUser
