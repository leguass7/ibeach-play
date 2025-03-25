import { useState } from 'react'

import { Grid, Button, FormControl, FormLabel, Select, Spinner, Box } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../TournamentStageProvider'

export default function ManualPairForm({ onSuccess }: { onSuccess: () => void }) {
  const { people, addPair, loading } = useTournamentStageProvider()
  const [selectedPerson1, setSelectedPerson1] = useState('')
  const [selectedPerson2, setSelectedPerson2] = useState('')

  const handleAddPair = async () => {
    if (selectedPerson1 && selectedPerson2) {
      await addPair(selectedPerson1, selectedPerson2)
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
            {people.map(p => (
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
            {people
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
        <Button onClick={handleAddPair} isDisabled={loading?.people} colorScheme="blue" width="full">
          {loading?.people ? <Spinner size="sm" /> : 'Adicionar'}
        </Button>
      </Box>
    </Grid>
  )
}
