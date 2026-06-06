import { Box, Button, Spinner, FormControl, FormLabel, Select, Flex, Heading } from '@chakra-ui/react'

interface BracketControlsProps {
  bracketSize: number
  setBracketSize: (size: number) => void
  handleGenerateBracket: () => void
  loading: boolean
}

export default function BracketControls({ bracketSize, setBracketSize, handleGenerateBracket, loading }: BracketControlsProps) {
  return (
    <Box mb={4}>
      <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
        <Heading as="h2" size="lg">
          Chaves do Torneio
        </Heading>
        <Flex wrap="wrap" gap={2} justify="flex-end">
          <FormControl minWidth="150px">
            <FormLabel>Tamanho</FormLabel>
            <Select value={bracketSize.toString()} onChange={e => setBracketSize(Number(e.target.value))} placeholder="Selecione o tamanho">
              {[2, 4, 8, 16, 32].map(size => (
                <option key={size} value={size}>
                  {size} duplas
                </option>
              ))}
            </Select>
          </FormControl>
          <Button colorScheme="blue" onClick={handleGenerateBracket} isDisabled={loading}>
            {loading ? <Spinner size="sm" /> : 'Gerar Chaves'}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
