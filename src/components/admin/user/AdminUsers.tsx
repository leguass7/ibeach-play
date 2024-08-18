/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import React from 'react'

import { useAdminUser } from '@/services/api/user/useUser'
import { CircularProgress } from '@chakra-ui/react'
import Link from 'next/link'

export const AdminUsers: React.FC = () => {
  const { data, isLoading } = useAdminUser()
  console.log('data', isLoading, data)
  return (
    <div>
      <h1>Users</h1>

      {// @ts-ignore
      data?.data?.map?.(user => {
        return (
          <div key={user.id}>
            <Link href={`/admin/user/${user.id}`} passHref>
              {user.id}: {user.email}
            </Link>
          </div>
        )
      })}
      {isLoading && <CircularProgress />}
    </div>
  )
}
