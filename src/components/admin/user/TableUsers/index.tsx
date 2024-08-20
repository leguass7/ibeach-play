import React from 'react'

import type { UserDTO } from '@/@server-side/use-cases/user'
import { CustomTable } from '@/components/CustomTable'

import { columns } from './columns'

type TableUsersProps = {
  users: UserDTO[]
}

export const TableUsers: React.FC<TableUsersProps> = ({ users }) => {
  return <CustomTable data={users} columns={columns} size={10} total={10} page={1} />
}
