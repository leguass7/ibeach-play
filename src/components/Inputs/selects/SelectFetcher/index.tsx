/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { useController, type Control } from 'react-hook-form'
import { uid } from 'react-uid'

import { useOnceCall } from '@/hooks/useOnceCall'
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'

export type ItemOption = {
  value: string | number
  label: string
}
export type Options = ItemOption[]
export type FetchHandler = (...args: unknown[]) => Promise<Options>
export type LoadedHandler = (data?: Options) => void

export type SelectFetcherProps = {
  name: string
  fetcher: FetchHandler
  label?: string
  control: Control<any>
  isRequired?: boolean
  isDisabled?: boolean
  onLoaded?: LoadedHandler
  placeholder?: string
}

export const SelectFetcher: React.FC<SelectFetcherProps> = ({
  fetcher,
  label,
  name = 'fieldName',
  control,
  isRequired,
  isDisabled,
  placeholder = 'selecione',
  onLoaded
}) => {
  const [loading, setLoading] = React.useState(false)
  const [options, setOptions] = React.useState<Options>([])

  const {
    field: { onChange, value, ref },
    fieldState: { error }
  } = useController({ name, control, rules: { required: isRequired && `'${label || name}' é requerido` } })

  const loadedHandler = React.useCallback(
    (data: Options) => {
      if (onLoaded) onLoaded?.(data)
    },
    [onLoaded]
  )

  const fetcData = React.useCallback(async () => {
    if (fetcher) {
      setLoading(true)
      const response = await fetcher?.()
      setLoading(false)
      if (response && Array.isArray(response)) setOptions(response)
      loadedHandler(response || [])
    }
  }, [fetcher, loadedHandler])

  useOnceCall(fetcData)

  const disabled = !!(isDisabled || loading)

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label ? <FormLabel>{label}</FormLabel> : null}
      <Select ref={ref} value={value} onChange={onChange} placeholder={placeholder} isDisabled={disabled}>
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
