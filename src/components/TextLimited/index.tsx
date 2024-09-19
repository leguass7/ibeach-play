import React from 'react'

import { limitString } from '@/helpers/string'
import { Text, TextProps } from '@chakra-ui/react'

export type TextLimitedProps = TextProps & {
  children?: React.ReactNode
  title?: string
  limit?: number
}

export const TextLimited: React.FC<TextLimitedProps> = ({ children, limit, title, ...rest }) => {
  const renderText = () => {
    const text = children || title
    return typeof text === 'string' ? limitString(text, limit) : text
  }
  return (
    <Text {...rest} title={title}>
      {renderText()}
    </Text>
  )
}
