import React from 'react'

import { LoadingProvider } from './LoadingProvider'
import { SWRProvider } from './SWRProvider'

type Props = {
  children: React.ReactNode
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <LoadingProvider>
      <SWRProvider>{children}</SWRProvider>
    </LoadingProvider>
  )
}
