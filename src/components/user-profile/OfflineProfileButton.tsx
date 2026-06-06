import React from 'react'
import { FaArrowCircleRight } from 'react-icons/fa'

import { useRouter } from 'next/navigation'

import { PrimaryButton } from '../Buttons/PrimaryButton'

export const OfflineProfileButton: React.FC = () => {
  const navigation = useRouter()

  const handleLogin = () => {
    navigation.push('/login')
  }
  return (
    <PrimaryButton
      width={120}
      height={9}
      leftIcon={<FaArrowCircleRight />}
      variant="solid"
      rounded={'full'}
      textButton={'Login'}
      onClick={handleLogin}
    />
  )
}
