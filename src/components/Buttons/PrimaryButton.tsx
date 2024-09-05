import React from 'react'

import { Button, ButtonProps as ButtonPropsChakra } from '@chakra-ui/react'

interface ButtonProps extends ButtonPropsChakra {
  colorScheme?: 'whiteAlpha' | 'blackAlpha' | 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled'
  onClick?: () => void
  children?: React.ReactNode
  textButton?: string
  icon?: React.ReactNode
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  colorScheme = 'gray',
  size = 'md',
  variant = 'solid',
  textButton = 'Button',
  icon,
  ...rest
}) => {
  const hasChild = children ? true : false
  const isOutline = variant === 'outline'
  return (
    <Button
      _hover={{ bgColor: 'primary.200' }}
      py={{ base: 6, md: 0 }}
      borderColor={isOutline ? 'primary.100' : 'transparent'}
      borderWidth={isOutline ? 2 : 0}
      color="secondary.300"
      bgColor={isOutline ? 'transparent' : 'primary.100'}
      rightIcon={React.isValidElement(icon) ? icon : undefined}
      onClick={onClick}
      colorScheme={colorScheme}
      size={size}
      variant={variant}
      {...rest}
    >
      {hasChild ? children : textButton}
    </Button>
  )
}
