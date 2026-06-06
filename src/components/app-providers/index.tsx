import React from 'react'

import { AlertProvider } from '@/components/Alert'

import { LoadingProvider } from './LoadingProvider'
import { SWRProvider } from './SWRProvider'

type Props = {
  children: React.ReactNode
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <LoadingProvider>
      <SWRProvider>{children}</SWRProvider>
      <AlertProvider />
    </LoadingProvider>
  )
}
