'use client'

import { useState } from 'react'

import { useOnceCall } from '@/hooks/useOnceCall'
import { Box, Alert, ChakraProvider } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../TournamentStageProvider'
import HeaderPair from './HeaderPair'
import ManualPairForm from './ManualPairForm'
import PairTable from './PairTable'

export default function PairGenerator({ onSuccess }: { onSuccess: () => void }) {
  const { pairs, fetchPeople, generatePairs, clearPairs, loading } = useTournamentStageProvider()

  const [sortMethod, setSortMethod] = useState<string>('balanced')
  const [error, setError] = useState<string | null>(null)
  const [manualPairMode, setManualPairMode] = useState(false)

  useOnceCall(fetchPeople)

  const handleSortMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value)
  }

  const handleGeneratePairs = async () => {
    setError(null)
    try {
      await generatePairs(sortMethod)
      onSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao gerar duplas.')
    }
  }

  const handleClearAllPairs = async () => {
    try {
      await clearPairs()
      onSuccess()
    } catch (error) {
      console.error('Error clearing pairs:', error)
    }
  }

  return (
    <ChakraProvider>
      <Box>
        <HeaderPair
          manualPairMode={manualPairMode}
          setManualPairMode={setManualPairMode}
          sortMethod={sortMethod}
          onSortChange={handleSortMethodChange}
          onGenerate={handleGeneratePairs}
          onClear={handleClearAllPairs}
          loading={loading.pairs}
          hasPairs={pairs.length > 0}
        />

        {error && <Alert status="error">{error}</Alert>}

        {manualPairMode ? <ManualPairForm onSuccess={onSuccess} /> : <PairTable pairs={pairs} loading={loading.pairs} />}
      </Box>
    </ChakraProvider>
  )
}
