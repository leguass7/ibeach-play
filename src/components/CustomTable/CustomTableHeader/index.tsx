import { Tr, Th, Thead } from '@chakra-ui/react'

import type { IColumn } from '../customTable.type'

type TableHeaderProps<T> = {
  columns: IColumn<T>[]
}

export const CustomTableHeader = <T,>({ columns }: TableHeaderProps<T>) => (
  <Thead>
    <Tr>{columns?.map(column => <Th key={String(column?.name)}>{column?.label}</Th>)}</Tr>
  </Thead>
)
