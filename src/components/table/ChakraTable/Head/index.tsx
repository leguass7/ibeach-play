import React from 'react'
import { uid } from 'react-uid'

import { Th, Thead, Tr, type TableHeadProps } from '@chakra-ui/react'

import { useColumns } from '../../core/hooks'
import { Label } from './Label'
import { SortLabel } from './SortLabel'

export const Head: React.FC<TableHeadProps> = props => {
  const [columns] = useColumns()

  return (
    <Thead {...props}>
      <Tr>
        {columns.map(column => {
          const key = uid(column)
          const { align, className, isCurrency, label, name, sortName, unsortable, width } = column
          const disabledSort = !name && !sortName ? true : !!unsortable
          return (
            <Th key={key} width={width} align={align} className={className}>
              {disabledSort ? (
                <Label content={label} isCurrency={isCurrency} />
              ) : (
                <SortLabel content={label} isCurrency={isCurrency} columnName={`${name || sortName}`} />
              )}
            </Th>
          )
        })}
      </Tr>
    </Thead>
  )
}
