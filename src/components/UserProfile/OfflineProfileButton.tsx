import React from 'react'

import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export const OfflineProfileButton: React.FC = () => {
  const navigation = useRouter()

  const handleLogin = () => {
    navigation.push('/login')
  }
  return <Button onClick={handleLogin}>LOGIN</Button>
}
