import React from 'react'

import { Card, CardBody, Center } from '@chakra-ui/react'
import { Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from '@chakra-ui/react'

export type CardStatButtonProps = {
  title?: string
  value?: number | string
  percentage?: number
  onClick?: () => void
}

export const CardStatButton: React.FC<CardStatButtonProps> = ({ title, percentage, value, onClick }) => {
  return (
    <Card>
      <CardBody>
        <Center>
          <Stat as="button" onClick={onClick}>
            {title ? <StatLabel>{title}</StatLabel> : null}
            {value ? <StatNumber>{value}</StatNumber> : null}
            {percentage ? (
              <StatHelpText>
                <StatArrow type={percentage > 0 ? 'increase' : 'decrease'} />
                {percentage}%
              </StatHelpText>
            ) : null}
          </Stat>
        </Center>
      </CardBody>
    </Card>
  )
}
