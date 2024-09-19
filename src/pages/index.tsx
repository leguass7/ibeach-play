import logoDefault from '@/assets/logo/ibeachplay-logo.png'
import { SearchArena } from '@/components/@features/arena/SearchArena'
import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SimpleSlider } from '@/components/SimpleSlider'
import useMobile from '@/hooks/useMobile'
import { Box, Button, Flex, HStack, Image, Stack, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

const ClientDashPage: NextPage = () => {
  const { isMobile } = useMobile()

  return (
    <LayoutContainer>
      <Stack>
        <VStack minHeight="100vh" justify="center" align="center" px={{ base: 0, md: '100px' }} spacing={6}>
          <Flex justifyContent="center" alignItems="center" width={'100%'}>
            <Image src={logoDefault.src} alt="Logo" width={{ base: 300, md: 460 }} height="auto" objectFit="contain" />
          </Flex>
          <SearchArena />
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
