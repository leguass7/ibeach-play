import React from 'react'

import { Box, Button, Spinner, FormControl, FormLabel, Select, Flex, Heading } from '@chakra-ui/react'

type HeaderPairProps = {
  manualPairMode: boolean
  setManualPairMode: (value: boolean) => void
  sortMethod: string
  onSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onGenerate: () => void
  onClear: () => void
  loading: boolean
  hasPairs: boolean
}

export default function HeaderPair({
  manualPairMode,
  setManualPairMode,
  sortMethod,
  onSortChange,
  onGenerate,
  onClear,
  loading,
  hasPairs
}: HeaderPairProps) {
  return (
    <Box mb={3}>
      <Flex justify="space-between" align="flex-start" wrap="wrap" gap={2}>
        <Heading as="h5" size="lg">
          Formação de Duplas
        </Heading>
        <Flex wrap="wrap" gap={2} justify="flex-end">
          {!manualPairMode && (
            <>
              <FormControl minWidth="200px">
                <FormLabel>Método de sorteio</FormLabel>
                <Select value={sortMethod} onChange={onSortChange} size="sm">
                  <option value="balanced">Balanceado por peso</option>
                  <option value="random">Aleatório</option>
                </Select>
              </FormControl>
              <Button onClick={onGenerate} isDisabled={loading} colorScheme="blue">
                {loading ? <Spinner size="sm" /> : 'Gerar Duplas'}
              </Button>
            </>
          )}
          <Button variant={manualPairMode ? 'solid' : 'outline'} onClick={() => setManualPairMode(!manualPairMode)}>
            {manualPairMode ? 'Voltar ao Modo Automático' : 'Modo Manual'}
          </Button>
          {hasPairs && (
            <Button variant="outline" colorScheme="red" onClick={onClear} isDisabled={loading}>
              Limpar Todas
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}
