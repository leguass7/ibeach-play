import React from 'react'

import { Input, InputProps as InputPropsChakra } from '@chakra-ui/react'

interface InputProps extends InputPropsChakra {
  colorScheme?: 'whiteAlpha' | 'blackAlpha' | 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  size?: 'lg' | 'md' | 'sm' | 'xs'
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled'
}

export const CommonInput: React.FC<InputProps> = ({ colorScheme = 'gray', size = 'md', variant = 'outline', ...rest }) => {
  return <Input {...rest} />
}
