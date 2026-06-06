import React from 'react'

import type { ClassroomHoursDTO } from '@/@server-side/use-cases/classroom-hour/classroom-hour.dto'
import { formatHour, formatWeekDay } from '@/helpers/date'
import { Badge, Flex } from '@chakra-ui/react'

type Props = {
  hours?: ClassroomHoursDTO[] | null
}

export const ItemHour: React.FC<Props> = ({ hours = [] }) => {
  return (
    <Flex gap={2}>
      {hours?.map(({ weekDay, id, startHour, classroomId }) => {
        const key = `${classroomId}-${id}`
        return (
          <Badge variant="solid" key={key} colorScheme="green" fontSize="10px">
            {formatWeekDay(weekDay)} - {formatHour(startHour)}
          </Badge>
        )
      })}
    </Flex>
  )
}
