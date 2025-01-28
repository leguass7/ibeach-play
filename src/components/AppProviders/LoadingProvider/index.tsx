import React from 'react'

import { LoadingContext } from './LoadingContext'
import { LoadingLayout } from './LoadingLayout'
import { LoadingProgress } from './LoadingProgress'

type Props = {
  children: React.ReactNode
}

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const start = React.useCallback(() => {
    setIsLoading(true)
  }, [])

  const done = React.useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <LoadingContext.Provider value={{ done, start, isLoading }}>
      <LoadingLayout>
        {children}
        {isLoading ? <LoadingProgress /> : null}
      </LoadingLayout>
    </LoadingContext.Provider>
  )
}
