import { createContext } from 'react'

export type LoadingContextType = {
  isLoading: boolean
  start: () => void
  done: () => void
}

export const LoadingContext = createContext<LoadingContextType | undefined>({} as LoadingContextType)
