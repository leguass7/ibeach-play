import React from 'react'
import { uid } from 'react-uid'

import { Tbody, type TableBodyProps } from '@chakra-ui/react'

import { useBody } from '../../core/hooks'
import { Row } from './Row'

export const Body: React.FC<TableBodyProps> = props => {
  const [records] = useBody()

  return (
    <Tbody {...props}>
      {records?.map(record => {
        const key = `row-${uid(record)}`
        return <Row key={key} record={record} />
      })}
    </Tbody>
  )
}
