/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import React from 'react'

import type { UserDTO } from '@/@server-side/use-cases/user'
import { useAdminUser } from '@/services/api/user/useUser'
import { CircularProgress, Tab } from '@chakra-ui/react'
import Link from 'next/link'

import { TableUsers } from './TableUsers'

export const AdminUsers: React.FC = () => {
  const { data, isLoading } = useAdminUser()
  console.log('data', isLoading, data)
  return (
    <div>
      <h1>Users</h1>
      {
        // @ts-ignore
        <TableUsers users={data?.data as UserDTO[]} />
      }

      {/* {// @ts-ignore
      data?.data?.map?.(user => {
        return (
          <div key={user.id}>
            <Link href={`/admin/user/${user.id}`} passHref>
              {user.id}: {user.email}
            </Link>
          </div>
        )
      })} */}
      {isLoading && <CircularProgress />}
    </div>
  )
}
