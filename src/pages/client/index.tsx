import logoDefault from '@/assets/logo/ibeachplay-logo.png'
import { PrimaryButton } from '@/components/Buttons/PrimaryButton'
import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SearchBar } from '@/components/SearchBar'
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
          <SearchBar />
          {isMobile ? (
            <Stack width={{ base: '100%', md: 'auto' }} direction={'row'} align={'center'} spacing={4} wrap="wrap" justify="center" mt={2}>
              <SimpleSlider variableWidth={true} isMobile={isMobile}>
                <Box width={'100%'} paddingX={1}>
                  <PrimaryButton borderRadius="xl">Melhores avaliadas</PrimaryButton>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <PrimaryButton borderRadius="xl">Novas arenas</PrimaryButton>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <PrimaryButton borderRadius="xl">Arenas com vagas</PrimaryButton>
                </Box>
                <Box width={'100%'} paddingX={1}>
                  <PrimaryButton borderRadius="xl">Mais procuradas</PrimaryButton>
                </Box>
              </SimpleSlider>
            </Stack>
          ) : (
            <HStack width={{ base: '100%', md: 'auto' }} align={'center'} spacing={4} wrap="wrap" justify="center" mt={2}>
              <PrimaryButton borderRadius="xl">Melhores avaliadas</PrimaryButton>
              <PrimaryButton borderRadius="xl">Novas arenas</PrimaryButton>
              <PrimaryButton borderRadius="xl">Arenas com vagas</PrimaryButton>
              <PrimaryButton borderRadius="xl">Mais procuradas</PrimaryButton>
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
