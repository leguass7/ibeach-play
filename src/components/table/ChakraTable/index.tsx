import React from 'react'

import { CircularProgress, Table, TableCaption, TableContainer, type TableProps as CKTableProps } from '@chakra-ui/react'

import type { TableProps } from '../core/interface'
import { TableProvider } from '../core/Provider'
import { Body } from './Body'
import { Head } from './Head'

type ChakraTableComponentType<C = unknown> = React.FC<TableProps<C> & { loading?: boolean; tableProps?: CKTableProps }>

export const ChakraTable: ChakraTableComponentType = ({ loading, records, columns, tableProps }) => {
  return (
    <TableProvider records={records} columns={columns}>
      <TableContainer mx="auto" maxW={'100%'} overflowX={'auto'}>
        <Table {...tableProps}>
          <TableCaption>{loading ? <CircularProgress isIndeterminate /> : 'Nenum registro'}</TableCaption>
          <Head />
          <Body />
        </Table>
      </TableContainer>
    </TableProvider>
  )
}
