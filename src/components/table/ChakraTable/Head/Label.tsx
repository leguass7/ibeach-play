import React from 'react'

type HeadLabelProps = {
  content?: React.ReactNode
  isCurrency?: boolean
  columnName?: string
}

export const Label: React.FC<HeadLabelProps> = ({ content }) => {
  return <span>{content}</span>
}
