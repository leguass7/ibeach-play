import { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

import logoDefault from '@/assets/logo/ibeachplay-logo.png'
import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, IconButton, Input, InputGroup, InputLeftElement, Stack, Text, Image, VStack, Flex } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

const ClientDashPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <LayoutContainer>
      <Stack>
        <VStack justify="center" align="center" spacing={6}>
          <Flex justifyContent="center" alignItems="center" width={'100%'}>
            <Image src={logoDefault.src} alt="Logo" width={460} height="auto" objectFit="contain" />
          </Flex>
          <Box marginTop={8} width={{ base: '100%', md: '100%' }} bgColor="gray.50" padding={1} rounded="full" position="relative">
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
                color="#084c6b"
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
          <Stack
            width={{ base: '100%', md: 'auto' }}
            direction={{ base: 'column', sm: 'row' }}
            align={'center'}
            spacing={4}
            wrap="wrap"
            justify="center"
            mt={2}
          >
            <Button _hover={{ bgColor: '#adca08' }} py={{ base: 6, md: 0 }} variant="solid" color="#05344a" bgColor={'#c8eb07'} borderRadius="lg">
              Arenas bem avaliadas
            </Button>
            <Button _hover={{ bgColor: '#adca08' }} py={{ base: 6, md: 0 }} variant="solid" color="#05344a" bgColor={'#c8eb07'} borderRadius="lg">
              Novas arenas
            </Button>
            <Button _hover={{ bgColor: '#adca08' }} py={{ base: 6, md: 0 }} variant="solid" color="#05344a" bgColor={'#c8eb07'} borderRadius="lg">
              Arenas com vagas
            </Button>
            <Button _hover={{ bgColor: '#adca08' }} py={{ base: 6, md: 0 }} variant="solid" color="#05344a" bgColor={'#c8eb07'} borderRadius="lg">
              Arenas mais procuradas
            </Button>
          </Stack>
        </VStack>

        <Box mt={6}>
          <Grid
            templateColumns={{
              sm: 'repeat(1, 1fr)',
              md: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)'
            }}
            gap={4}
          >
            <CardArena />
            <CardArena />
            <CardArena />
            <CardArena />
            <CardArena />
            <CardArena />
            <CardArena />
            <CardArena />
          </Grid>
        </Box>
      </Stack>
    </LayoutContainer>
  )
}

export default ClientDashPage
