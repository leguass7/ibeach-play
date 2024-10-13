import React from 'react'

// import { Container } from './styles';

type HeadLabelProps = {
  content?: React.ReactNode
  isCurrency?: boolean
  columnName?: string
}

export const SortLabel: React.FC<HeadLabelProps> = ({ content }) => {
  return <span>{content}</span>
}
