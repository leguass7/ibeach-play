import React from 'react'

import { Box } from '@chakra-ui/react'

import { AppBar } from '../AppBar'
import type { IRoutes } from '../layout.type'

type Props = {
  routes?: IRoutes[]
}

export const Header: React.FC<Props> = ({ routes }) => {
  return (
    <Box as="header">
      <AppBar routes={routes} />
    </Box>
  )
}
