import { FaArrowLeft, FaArrowRight } from 'react-icons/fa' // Importando os ícones

import { HStack, IconButton } from '@chakra-ui/react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const CustomTablePaginate = ({ currentPage, totalPages, onNextPage, onPreviousPage }: PaginationProps) => (
  <HStack mt={4} justifyContent="space-between">
    <IconButton icon={<FaArrowLeft />} aria-label="Previous page" onClick={onPreviousPage} isDisabled={currentPage === 1} />
    <IconButton icon={<FaArrowRight />} aria-label="Next page" onClick={onNextPage} isDisabled={currentPage >= totalPages} />
  </HStack>
)
