import React from 'react'

import { CircularProgress, Table, TableCaption, TableContainer } from '@chakra-ui/react'

import type { TableProps } from '../core/interface'
import { TableProvider } from '../core/Provider'
import { Body } from './Body'

type ChakraTableComponentType<C = unknown> = React.FC<TableProps<C> & { loading?: boolean }>

export const ChakraTable: ChakraTableComponentType = ({ loading, records }) => {
  return (
    <TableProvider records={records}>
      <TableContainer>
        <Table>
          <TableCaption>{loading ? <CircularProgress isIndeterminate /> : 'Nenum registro'}</TableCaption>
          <Body />
        </Table>
      </TableContainer>
    </TableProvider>
  )
}
