import React from 'react'

import { CircularProgress, Table, TableCaption, TableContainer } from '@chakra-ui/react'

import type { TableProps } from '../core/interface'

type ChakraTableComponentType<C = unknown> = React.FC<TableProps<C> & { loading?: boolean }>

export const ChakraTable: ChakraTableComponentType = ({ loading }) => {
  return (
    <TableContainer>
      <Table>
        <TableCaption>{loading ? <CircularProgress isIndeterminate /> : 'Nenum registro'}</TableCaption>
      </Table>
    </TableContainer>
  )
}
