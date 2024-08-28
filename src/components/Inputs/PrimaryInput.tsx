import React from 'react'

import { Input, InputGroup, InputLeftElement, InputProps as ChakraInputProps } from '@chakra-ui/react'

interface CommonInputProps extends ChakraInputProps {
  icon?: React.ReactElement
}

export const PrimaryInput: React.FC<CommonInputProps> = ({
  icon,
  borderColor = 'primary.100',
  focusBorderColor = 'primary.100',
  rounded = '2xl',
  height = 12,
  color = 'gray.50',
  fontWeight = 600,
  pl = icon ? 10 : 4,
  ...props
}) => {
  return (
    <InputGroup>
      {icon && (
        <InputLeftElement pointerEvents="none" height="100%" display="flex" alignItems="center" justifyContent="center">
          {React.isValidElement(icon) && React.cloneElement(icon)}
        </InputLeftElement>
      )}
      <Input
        borderColor={borderColor}
        focusBorderColor={focusBorderColor}
        rounded={rounded}
        height={height}
        color={color}
        fontWeight={fontWeight}
        pl={pl}
        {...props}
      />
    </InputGroup>
  )
}
