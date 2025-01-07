import React from 'react'

import { SWRProvider } from './SWRProvider'

type Props = {
  children: React.ReactNode
}

export const AppProviders: React.FC<Props> = ({ children }) => {
  return <SWRProvider>{children}</SWRProvider>
}
