import { useContext } from 'react'

import { LoadingContext, type LoadingContextType } from './LoadingContext'

export function useLayoutLoading() {
  const context = useContext(LoadingContext)
  return context as LoadingContextType
}
