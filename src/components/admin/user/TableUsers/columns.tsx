import type { UserDTO } from '@/@server-side/use-cases/user'
import type { IColumn } from '@/components/CustomTable/customTable.type'

export const columns: IColumn<UserDTO>[] = [
  { label: 'ID', name: 'id', Cell: id => <span>{Number(id)}</span> },
  { label: 'Nome', name: 'name', Cell: name => <span>{String(name)}</span> },
  { label: 'Email', name: 'email', Cell: email => <span>{String(email)}</span> }
]
