import React from 'react'

import { Box } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const MainContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main" p={4} flex={'1'}>
      {children}
    </Box>
  )
}
