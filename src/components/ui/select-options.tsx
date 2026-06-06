/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react'
import { useController, type Control } from 'react-hook-form'
import { uid } from 'react-uid'

import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'

export type ItemOption = {
  value: string | number
  label: string
}
export type Options = ItemOption[]

export type SelectOptionsProps = {
  name: string
  label?: string
  control: Control<any>
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  options: Options
}

export const SelectOptions: React.FC<SelectOptionsProps> = ({
  control,
  name = 'fieldName',
  isDisabled,
  options = [],
  isRequired,
  label,
  placeholder
}) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({ name, control, rules: { required: isRequired && `'${label || name}' é requerido` } })

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Select ref={ref} value={value} onChange={onChange} placeholder={placeholder} isDisabled={isDisabled}>
        {options?.map(item => (
          <option key={uid(item)} value={item?.value}>
            {item.label}
          </option>
        ))}
      </Select>
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
