import { useState } from 'react'

import { Grid, Button, FormControl, FormLabel, Select, Spinner, Box } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../tournament-stage-provider'

export default function ManualPairForm({ onSuccess }: { onSuccess: () => void }) {
  const { enrollments, onCreateAndSaveManualTeam, loading } = useTournamentStageProvider()
  const [selectedPerson1, setSelectedPerson1] = useState('')
  const [selectedPerson2, setSelectedPerson2] = useState('')

  const handleOnCreateAndSaveManualTeam = async () => {
    if (selectedPerson1 && selectedPerson2) {
      await onCreateAndSaveManualTeam(selectedPerson1, selectedPerson2)
      setSelectedPerson1('')
      setSelectedPerson2('')
      onSuccess()
    }
  }

  return (
    <Grid templateColumns="repeat(12, 1fr)" gap={4}>
      <Box gridColumn="span 5">
        <FormControl>
          <FormLabel>Primeira pessoa</FormLabel>
          <Select value={selectedPerson1} onChange={e => setSelectedPerson1(e.target.value)} placeholder="Selecione uma pessoa">
            {enrollments.map(p => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box gridColumn="span 5">
        <FormControl>
          <FormLabel>Segunda pessoa</FormLabel>
          <Select value={selectedPerson2} onChange={e => setSelectedPerson2(e.target.value)} placeholder="Selecione uma pessoa">
            {enrollments
              .filter(p => p.id !== selectedPerson1)
              .map(p => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
          </Select>
        </FormControl>
      </Box>
      <Box gridColumn="span 2">
        <Button onClick={handleOnCreateAndSaveManualTeam} isDisabled={loading?.enrollments} colorScheme="blue" width="full">
          {loading?.enrollments ? <Spinner size="sm" /> : 'Adicionar'}
        </Button>
      </Box>
    </Grid>
  )
}
