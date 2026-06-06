import React from 'react'
import { useResizeDetector, type OnResizeCallback } from 'react-resize-detector'

import { Box } from '@chakra-ui/react'

import type { IRoutes } from '../../layout.type'
import { AppBar } from './AppBar'

export type HeaderResizeHandler = OnResizeCallback
type Props = {
  routes?: IRoutes[]
  onResize?: HeaderResizeHandler
}

export const Header: React.FC<Props> = ({ routes, onResize }) => {
  const { ref } = useResizeDetector({ refreshMode: 'debounce', refreshRate: 300, onResize })
  return (
    <Box ref={ref} as="header" zIndex={1000} width={'100%'} position={'absolute'} top={0}>
      <AppBar routes={routes} />
    </Box>
  )
}
