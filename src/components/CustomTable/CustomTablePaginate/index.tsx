import { FaArrowLeft, FaArrowRight } from 'react-icons/fa' // Importando os ícones

import { HStack, IconButton, VStack } from '@chakra-ui/react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onNextPage: () => void
  onPreviousPage: () => void
}

export const CustomTablePaginate = ({ currentPage, totalPages, onNextPage, onPreviousPage }: PaginationProps) => (
  <HStack mt={2} justifyContent={'flex-end'}>
    <IconButton icon={<FaArrowLeft />} aria-label="Previous page" onClick={onPreviousPage} isDisabled={currentPage === 1} size={'xs'} />
    <HStack spacing={1}>
      <span>{currentPage}</span>
      <span>de</span>
      <span>{totalPages}</span>
    </HStack>
    <IconButton icon={<FaArrowRight />} aria-label="Next page" onClick={onNextPage} isDisabled={currentPage >= totalPages} size={'xs'} />
  </HStack>
)
