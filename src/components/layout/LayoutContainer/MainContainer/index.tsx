import React from 'react'

import { Box } from '@chakra-ui/react'

type Props = {
  children?: React.ReactNode
  marginTop?: number
}

export const MainContainer: React.FC<Props> = ({ children, marginTop }) => {
  return (
    <Box as="main" flex={'1'} marginBottom={'16px'} paddingTop={`${marginTop}px`}>
      {children}
    </Box>
  )
}
