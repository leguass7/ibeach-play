import React from 'react'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa'

import { Box } from '@chakra-ui/react'

import { type CommonInputProps, PrimaryInput } from './PrimaryInput'

export type PasswordInputProps = Omit<CommonInputProps, 'start' | 'end' | 'type'>

export const PasswordInput: React.FC<PasswordInputProps> = React.forwardRef<HTMLInputElement>((prop, ref) => {
  const { ...rest } = prop
  const [showPassword, setShowPassword] = React.useState(false)

  const handleShowClick = () => setShowPassword(old => !old)

  const renderEye = React.useCallback(() => {
    return (
      <Box onClick={handleShowClick} cursor="pointer">
        {showPassword ? <FaEyeSlash color="#ffff" fontSize="18px" /> : <FaEye color="#ffff" fontSize="18px" />}
      </Box>
    )
  }, [showPassword])

  return (
    <PrimaryInput
      {...rest}
      inputRef={ref}
      start={<FaLock color="#ffff" />}
      type={showPassword ? 'text' : 'password'}
      autoComplete={'new-password'}
      end={renderEye()}
    />
  )
})

PasswordInput.displayName = 'PasswordInput'
