import { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SimpleSlider } from '@/components/SimpleSlider'
import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, IconButton, Input, InputGroup, InputLeftElement, Stack, useBreakpointValue, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

const ClientDashPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('')

  const isMobile = useBreakpointValue({ base: true, md: false })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <LayoutContainer>
      <Stack paddingY={8}>
        <VStack justify="center" align="center" mb={10}>
          <Box width={{ base: '100%', md: 800 }} bgColor="gray.50" padding={1} rounded="full" position="relative">
            <InputGroup borderRadius="full">
              <InputLeftElement top={1} left={2} pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                value={inputValue}
                onChange={handleChange}
                paddingLeft="3rem"
                height={12}
                placeholder="Digite o nome de uma arena..."
                borderRadius="full"
                fontWeight="bold"
                fontSize="xl"
                color="teal.600"
                _placeholder={{
                  color: 'gray.300',
                  fontWeight: 'bold',
                  fontSize: 'lg'
                }}
              />
              {inputValue && (
                <IconButton
                  zIndex={1000}
                  aria-label="Clear input"
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
              )}
            </InputGroup>
          </Box>
          <Stack width={{ base: '100%', md: 'auto' }} direction={{ base: 'column', sm: 'row' }} spacing={4} wrap="wrap" justify="center" mt={2}>
            <Button py={{ base: 6, md: 0 }} variant="solid" colorScheme="teal" borderRadius="lg">
              Arenas bem avaliadas
            </Button>
            <Button py={{ base: 6, md: 0 }} variant="solid" colorScheme="teal" borderRadius="lg">
              Novas arenas
            </Button>
            <Button py={{ base: 6, md: 0 }} variant="solid" colorScheme="teal" borderRadius="lg">
              Arenas com vagas
            </Button>
          </Stack>
        </VStack>

        <Box mt={6}>
          <SimpleSlider isMobile={isMobile}>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
            <Box px={{ base: 2, md: 4 }}>
              <CardArena />
            </Box>
          </SimpleSlider>
        </Box>
      </Stack>
    </LayoutContainer>
  )
}

export default ClientDashPage
