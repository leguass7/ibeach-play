import React from 'react'

import { Spinner } from '@chakra-ui/react'

import { LoaderBackground, LoadingContainer } from './styles'

export const LoadingProgress: React.FC = () => {
  return (
    <LoadingContainer>
      <Spinner color="white" zIndex={1002} />
      <LoaderBackground />
    </LoadingContainer>
  )
}
