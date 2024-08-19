import { useState } from 'react'
import { FaTimesCircle } from 'react-icons/fa'

import logoDefault from '@/assets/logo/ibeachplay-logo.png'
import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Grid, IconButton, Input, InputGroup, InputLeftElement, Stack, Image, VStack, Flex, HStack } from '@chakra-ui/react'
import type { NextPage } from 'next/types'
import { SimpleSlider } from '@/components/SimpleSlider'
import useMobile from '@/hooks/useMobile'

const ClientDashPage: NextPage = () => {
  const [inputValue, setInputValue] = useState('')
  const { isMobile } = useMobile()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <LayoutContainer>
      <Stack>
        <VStack minHeight="100vh" justify="center" align="center" px={{ base: 0, md: '100px' }} spacing={6}>
          <Flex justifyContent="center" alignItems="center" width={'100%'}>
            <Image src={logoDefault.src} alt="Logo" width={{ base: 300, md: 460 }} height="auto" objectFit="contain" />
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
                color="#08567a"
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
          {isMobile ? (
            <Stack width={{ base: '100%', md: 'auto' }} direction={'row'} align={'center'} spacing={4} wrap="wrap" justify="center" mt={2}>
              <SimpleSlider variableWidth={true} isMobile={isMobile}>
                <Box width={'100%'} paddingX={1}>
                  <Button
                    _hover={{ bgColor: 'primary.50' }}
                    py={{ base: 6, md: 0 }}
                    variant="solid"
                    color="#05344a"
                    bgColor={'primary.100'}
                    borderRadius="xl"
                  >
                    Melhores avaliadas
                  </Button>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <Button
                    _hover={{ bgColor: 'primary.50' }}
                    py={{ base: 6, md: 0 }}
                    variant="solid"
                    color="#05344a"
                    bgColor={'primary.100'}
                    borderRadius="xl"
                  >
                    Novas arenas
                  </Button>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <Button
                    _hover={{ bgColor: 'primary.50' }}
                    py={{ base: 6, md: 0 }}
                    variant="solid"
                    color="#05344a"
                    bgColor={'primary.100'}
                    borderRadius="xl"
                  >
                    Arenas com vagas
                  </Button>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <Button
                    _hover={{ bgColor: 'primary.50' }}
                    py={{ base: 6, md: 0 }}
                    variant="solid"
                    color="#05344a"
                    bgColor={'primary.100'}
                    borderRadius="xl"
                  >
                    Mais procuradas
                  </Button>
                </Box>
              </SimpleSlider>
            </Stack>
          ) : (
            <HStack width={{ base: '100%', md: 'auto' }} align={'center'} spacing={4} wrap="wrap" justify="center" mt={2}>
              <Button
                _hover={{ bgColor: 'primary.50' }}
                py={{ base: 6, md: 0 }}
                variant="solid"
                color="#05344a"
                bgColor={'primary.100'}
                borderRadius="xl"
              >
                Melhores avaliadas
              </Button>
              <Button
                _hover={{ bgColor: 'primary.50' }}
                py={{ base: 6, md: 0 }}
                variant="solid"
                color="#05344a"
                bgColor={'primary.100'}
                borderRadius="xl"
              >
                Novas arenas
              </Button>
              <Button
                _hover={{ bgColor: 'primary.50' }}
                py={{ base: 6, md: 0 }}
                variant="solid"
                color="#05344a"
                bgColor={'primary.100'}
                borderRadius="xl"
              >
                Arenas com vagas
              </Button>
              <Button
                _hover={{ bgColor: 'primary.50' }}
                py={{ base: 6, md: 0 }}
                variant="solid"
                color="#05344a"
                bgColor={'primary.100'}
                borderRadius="xl"
              >
                Mais procuradas
              </Button>
            </HStack>
          )}
        </VStack>

        <HStack paddingY={24}>
          <SimpleSlider mobileSlidesToShow={1} isMobile={isMobile}>
            <Box px={2}>
              <CardArena />
            </Box>
            <Box px={2}>
              <CardArena />
            </Box>
            <Box px={2}>
              <CardArena />
            </Box>
            <Box px={2}>
              <CardArena />
            </Box>
          </SimpleSlider>
        </HStack>
      </Stack>
    </LayoutContainer>
  )
}

export default ClientDashPage
