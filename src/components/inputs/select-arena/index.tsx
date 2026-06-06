import React from 'react'
import { useController, type Control } from 'react-hook-form'

import useFetcher from '@/hooks/useFetcher'
import { useOnceCall } from '@/hooks/useOnceCall'
import type { FormClassroomData } from '@/services/api/classroom'
import { coachGetArenaOptions } from '@/services/api/coach'
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'

type Props = {
  label?: string
  control: Control<FormClassroomData>
  isRequired?: boolean
  isDisabled?: boolean
}

/**
 * - Carrega as arenas disponíveis para seleção
 * - Integrado com `react-hook-form`
 */
export const SelectArena: React.FC<Props> = ({ label = 'Arena', control, isRequired, isDisabled }) => {
  const [requestData, loading, response] = useFetcher(coachGetArenaOptions)
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({ name: 'arenaId', control, rules: { required: isRequired && 'Arena é obrigatória' } })

  useOnceCall(requestData)

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Select ref={ref} value={value} onChange={onChange} placeholder="Selecione uma arena" isDisabled={isDisabled || loading}>
        {response?.arenas?.map(arena => (
          <option key={arena.id} value={arena.id}>
            {arena.name}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
