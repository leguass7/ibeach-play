import React from 'react'

import { Button, ButtonProps as ButtonPropsChakra } from '@chakra-ui/react'

interface ButtonProps extends ButtonPropsChakra {
  colorScheme?: 'whiteAlpha' | 'blackAlpha' | 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled'
  onClick?: () => void
  children?: React.ReactNode
  textButton?: string
}

export const ButtonChakra: React.FC<ButtonProps> = ({
  children,
  onClick,
  colorScheme = 'gray',
  size = 'md',
  variant = 'solid',
  textButton = 'Button',
  ...rest
}) => {
  const hasChild = children ? true : false
  return (
    <Button onClick={onClick} colorScheme={colorScheme} size={size} variant={variant} {...rest}>
      {hasChild ? children : textButton?.toLocaleUpperCase()}
    </Button>
  )
}
