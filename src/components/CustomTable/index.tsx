import { useState } from 'react'

import { Table, TableContainer, Box } from '@chakra-ui/react'

import type { IPaginatedTableProps } from './customTable.type'
import { CustomTableBody } from './CustomTableBody'
import { CustomTableHeader } from './CustomTableHeader'
import { CustomTablePaginate } from './CustomTablePaginate'

const ITEMS_PER_PAGE = 10

export const CustomTable = <T,>({ data, columns, size = ITEMS_PER_PAGE }: IPaginatedTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1)
  }

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const startIndex = (currentPage - 1) * size
  const paginatedData = data?.slice(startIndex, startIndex + size)

  return (
    <Box>
      <TableContainer>
        <Table variant="simple">
          <CustomTableHeader columns={columns} />
          <CustomTableBody data={paginatedData} columns={columns} />
        </Table>
      </TableContainer>
      <CustomTablePaginate
        currentPage={currentPage}
        totalPages={Math?.ceil(data?.length / size)}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </Box>
  )
}
