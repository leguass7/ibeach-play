/* eslint-disable @typescript-eslint/no-explicit-any */
// import 'react-datepicker/dist/react-datepicker.css'
// import './chakra-react-datepicker.module.css'
'use client'
import React from 'react'
// import ReactDatePicker from 'react-datepicker'
import { useController, type Control } from 'react-hook-form'

import { tryDate } from '@/helpers/date'
import {
  FormControl,
  FormLabel
  // Input
} from '@chakra-ui/react'
import { FormErrorMessage } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'

const MONTH_NAMES_DEFAULT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
const DAY_NAMES_DEFAULT = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']
const DATE_FORMAT_DEFAULT = 'dd/MM/yyyy'

type ChangeHandler = (date: Date | null) => void
export type DatePickerProps = {
  name: string
  label?: string
  control: Control<any>
  isRequired?: boolean
  isDisabled?: boolean
  placeholder?: string
  //
  // isClearable?: boolean
}

export const DatePicker: React.FC<DatePickerProps> = ({
  name,
  control,
  isRequired,
  label
  // isClearable
}) => {
  // const inputRef = React.useRef<HTMLInputElement | null>(null)
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ name, control, rules: { required: isRequired && `'${label || name}' é requerido` } })

  const handleChange: ChangeHandler = date => {
    console.log('date', date)
    onChange?.(date)
  }

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <SingleDatepicker
        onDateChange={handleChange}
        date={tryDate(value) || undefined}
        configs={{
          dateFormat: DATE_FORMAT_DEFAULT,
          monthNames: MONTH_NAMES_DEFAULT,
          dayNames: DAY_NAMES_DEFAULT
        }}
      />
      {/* <ReactDatePicker
        selected={tryDate(value) || undefined}
        onChange={handleChange}
        className="react-datapicker__input-text"
        customInput={<Input ref={inputRef} />}
        dateFormat="dd/MM/yyyy"
        showPopperArrow={true}
        dropdownMode="scroll"
        isClearable={isClearable}
      /> */}
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
