import React from 'react'

import type { TableProps, TableRecord } from '../core/interface'

type ChakraTableComponentType<C = TableRecord> = React.FC<TableProps<C>>

export const ChakraTable: ChakraTableComponentType = () => {
  return <div />
}
