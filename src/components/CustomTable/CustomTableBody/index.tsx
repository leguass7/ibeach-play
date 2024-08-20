import type { ReactNode } from 'react'

import { Tr, Td, Tbody } from '@chakra-ui/react'

import type { IColumn } from '../customTable.type'

type TableBodyProps<T> = {
  data: T[]
  columns: IColumn<T>[]
}

export const CustomTableBody = <T,>({ data, columns }: TableBodyProps<T>) => (
  <Tbody>
    {data.map((item, index) => (
      <Tr key={`${index}`}>
        {columns?.map(column => {
          const cellValue = column.Cell ? column.Cell(item[column.name]) : item[column.name]
          return <Td key={String(column.name)}>{cellValue as ReactNode}</Td>
        })}
      </Tr>
    ))}
  </Tbody>
)
