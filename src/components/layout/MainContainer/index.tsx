import React from 'react'

import { Box } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
}

export const MainContainer: React.FC<Props> = ({ children }) => {
  return (
    <Box as="main" flex={'1'} marginBottom={'16px'}>
      {children}
    </Box>
  )
}
