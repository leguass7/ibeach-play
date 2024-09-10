import React from 'react'

import { Box } from '@chakra-ui/react'

import type { IRoutes } from '../../layout.type'
import { AppBar } from './AppBar'

type Props = {
  routes?: IRoutes[]
}

export const Header: React.FC<Props> = ({ routes }) => {
  return (
    <Box as="header" zIndex={1000} width={'100%'} position={'absolute'} top={0} style={{ border: '1px dashed #000' }}>
      <AppBar routes={routes} />
    </Box>
  )
}
