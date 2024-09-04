import React from 'react'

import { Input, InputGroup, InputLeftElement, InputProps, FormErrorMessage, FormControl, InputRightElement } from '@chakra-ui/react'

export interface CommonInputProps extends InputProps {
  inputRef?: React.LegacyRef<HTMLInputElement> | React.ForwardedRef<HTMLInputElement>
  start?: React.ReactNode
  end?: React.ReactNode
  errorMessage?: string
  children?: React.ReactNode
}

export const PrimaryInput: React.FC<CommonInputProps> = React.forwardRef((prop, ref) => {
  const {
    inputRef,
    start,
    end,
    borderColor = 'primary.100',
    focusBorderColor = 'primary.100',
    rounded = '2xl',
    height = 12,
    color = 'gray.50',
    fontWeight = 600,
    pl = start ? 10 : 4,
    isInvalid,
    errorMessage,
    children,
    ...props
  } = prop

  return (
    <FormControl isInvalid={!!isInvalid || !!errorMessage}>
      <InputGroup>
        {start && (
          <InputLeftElement pointerEvents="none" height="100%" display="flex" alignItems="center" justifyContent="center">
            {React.isValidElement(start) && start}
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
          ref={inputRef || ref}
          isInvalid={!!isInvalid || !!errorMessage}
          {...props}
        />
        {end ? (
          <InputRightElement height="100%" display="flex" alignItems="center">
            {React.isValidElement(end) && end}
          </InputRightElement>
        ) : null}
      </InputGroup>
      {errorMessage ? (
        <FormErrorMessage mt={'2px'} pl={'10px'} hidden={false} fontSize={'12px'}>
          {errorMessage}
        </FormErrorMessage>
      ) : null}
      {children}
    </FormControl>
  )
})

PrimaryInput.displayName = 'PrimaryInput'
