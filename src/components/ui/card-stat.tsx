import React from 'react'

import { Card, CardBody, Center, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/react'

export type CardStatProps = {
  title?: string
  value?: number | string
  percentage?: number
  onClick?: () => void
}

export const CardStat: React.FC<CardStatProps> = ({ title, percentage, value, onClick }) => {
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
