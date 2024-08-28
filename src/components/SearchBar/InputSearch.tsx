'use client'
import React from 'react'
import { FaTimesCircle } from 'react-icons/fa'

import { debounceEvent } from '@/helpers/debounce'
import { useOnceCall } from '@/hooks/useOnceCall'
import { SearchIcon } from '@chakra-ui/icons'
import { IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

export type TextChangeHandler = (text?: string) => void

export type InputSearchProps = {
  debounce?: number
  onChangeText?: TextChangeHandler
  onClear?: () => void
  maxLength?: number
  defaultValue?: string
}

export const InputSearch: React.FC<InputSearchProps> = ({ debounce = 500, onChangeText, onClear, maxLength = 120, defaultValue }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const [, setError] = React.useState('')

  const emitText = React.useCallback(
    (text?: string) => {
      if (onChangeText) onChangeText(text)
      if (onClear && !text) onClear()
    },
    [onChangeText, onClear]
  )

  const handleClear = React.useCallback(() => {
    if (inputRef?.current) {
      inputRef.current.value = ''
      emitText('')
    }
  }, [emitText])

  useOnceCall(() => {
    emitText(defaultValue)
    if (defaultValue && inputRef?.current?.value && inputRef.current.value !== defaultValue) {
      inputRef.current.value = defaultValue || ''
    }
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    setError('')
    const newText = event?.target?.value ?? ''
    if (newText.length >= maxLength) {
      setError('Máximo de 120 caracteres')
    } else emitText(newText)
  }

  return (
    <InputGroup borderRadius="full">
      <InputLeftElement top={1} left={2} pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        ref={inputRef || null}
        onChange={debounceEvent(handleChange, debounce)}
        paddingLeft="3rem"
        height={12}
        placeholder="Digite o nome de uma arena..."
        borderRadius="full"
        fontWeight="bold"
        fontSize="xl"
        color="#08567a"
        _placeholder={{
          color: 'gray.300',
          fontWeight: 'bold',
          fontSize: 'lg'
        }}
      />
      {onClear ? (
        <IconButton
          zIndex={1000}
          aria-label="limpar pesquisa"
          icon={<FaTimesCircle />}
          onClick={handleClear}
          position="absolute"
          right="4"
          top="50%"
          transform="translateY(-50%)"
          variant="outline"
          border="none"
          padding="0"
          minWidth="auto"
          borderRadius="full"
          background="transparent"
          color="gray.400"
          fontSize="xl"
          _hover={{
            color: 'gray.600'
          }}
        />
      ) : null}
    </InputGroup>
  )
}