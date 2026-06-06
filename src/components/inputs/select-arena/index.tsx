import React from 'react'
import type { Control } from 'react-hook-form'

import type { FormClassroomData } from '@/services/api/classroom'
import { useCoachArenaOptions } from '@/services/api/coach/useCoachArenas'
import { SelectFetcher } from '@ui/select-fetcher'

type Props = {
  label?: string
  control: Control<FormClassroomData>
  isRequired?: boolean
  isDisabled?: boolean
}

export const SelectArena: React.FC<Props> = ({ label = 'Arena', control, isRequired, isDisabled }) => {
  const [fetcher] = useCoachArenaOptions()

  return (
    <SelectFetcher
      name="arenaId"
      label={label}
      control={control}
      isRequired={isRequired}
      isDisabled={isDisabled}
      fetcher={fetcher}
      placeholder="Selecione uma arena"
    />
  )
}
