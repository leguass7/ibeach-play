import React from 'react'
import { uid } from 'react-uid'

import { Td, Tr } from '@chakra-ui/react'

import { protectedCellContent } from '../../core/helper'
import { useColumns } from '../../core/hooks'
import type { ITableColumn, TableRecord } from '../../core/interface'

export type RowProps<R = TableRecord> = {
  record: R
}

export const Row: React.FC<RowProps> = ({ record }) => {
  const [columns] = useColumns()

  const renderCell = (columnName: string, Cell?: ITableColumn['Cell'], CellProps: ITableColumn['CellProps'] = {}) => {
    if (Cell) return <Cell record={record} columnName={columnName} {...CellProps} />
    return <>{protectedCellContent(record?.[columnName])}</>
  }

  return (
    <Tr>
      {columns.map(props => {
        const key = `cell-${uid(props)}`
        const { align = 'left', Cell, CellProps, name, vAlign = 'middle', width } = props

        return (
          <Td key={key} align={align} width={width} sx={{ maxWidth: width, verticalAlign: vAlign, width }}>
            {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              renderCell(`${name}`, Cell, CellProps)
            }
          </Td>
        )
      })}
    </Tr>
  )
}
