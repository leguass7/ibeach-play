/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client'

import React from 'react'

import type { UserDTO } from '@/@server-side/use-cases/user'
import { useAdminUser } from '@/services/api/user/useUser'
import { CircularProgress, Tab } from '@chakra-ui/react'
import { ShirtSize, UserGender } from '@prisma/client'
import Link from 'next/link'

import { TableUsers } from './TableUsers'

const mockUsers: UserDTO[] = [
  {
    id: 1,
    email: 'john.doe@example.com',
    password: null,
    nick: 'johndoe',
    name: 'John Doe',
    cpf: '123.456.789-00',
    birday: new Date('1990-01-01'),
    gender: UserGender.M,
    phone: '1234567890',
    image: 'https://example.com/images/john.jpg',
    cityId: 1,
    emailVerified: new Date('2022-01-01T00:00:00Z'),
    shirtSize: ShirtSize.M,
    createdAt: new Date('2022-01-01T00:00:00Z'),
    updatedAt: new Date('2022-06-01T00:00:00Z'),
    lastAccess: new Date('2023-08-20T00:00:00Z')
  },
  {
    id: 2,
    email: 'jane.doe@example.com',
    password: null,
    nick: 'janedoe',
    name: 'Jane Doe',
    cpf: '987.654.321-00',
    birday: new Date('1992-02-02'),
    gender: UserGender.F,
    phone: '0987654321',
    image: 'https://example.com/images/jane.jpg',
    cityId: 2,
    emailVerified: new Date('2022-02-02T00:00:00Z'),
    shirtSize: ShirtSize.P,
    createdAt: new Date('2022-02-02T00:00:00Z'),
    updatedAt: new Date('2022-07-02T00:00:00Z'),
    lastAccess: new Date('2023-08-19T00:00:00Z')
  }
]

export const AdminUsers: React.FC = () => {
  const { data, isLoading } = useAdminUser()
  console.log('data', isLoading, data)
  return (
    <div>
      <h1>Users</h1>
      <TableUsers users={mockUsers} />

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
