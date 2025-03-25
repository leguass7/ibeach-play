'use client'

import { useState } from 'react'

import { Container, Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, useToast } from '@chakra-ui/react'
import Head from 'next/head'

import PairGenerator from '../PairGenerator'
import PeopleManager from '../PeopleManager'
import TournamentBracket from '../TournamentBracket'

export default function TournamentComponentPage() {
  const [tabIndex, setTabIndex] = useState(0)
  const toast = useToast()

  const handleTabsChange = (index: number) => {
    setTabIndex(index)
  }

  const showSuccessToast = () => {
    toast({
      title: 'Operação realizada com sucesso.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom'
    })
  }

  return (
    <>
      <Head>
        <title>Sorteio de Chaves para Torneio</title>
        <meta name="description" content="Aplicação para sorteio de chaves para torneio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxW="container.xl" py={4}>
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Sorteio de Chaves para Torneio
        </Heading>

        <Box boxShadow="md" mt={4} borderRadius="md" borderWidth={1}>
          <Tabs index={tabIndex} onChange={handleTabsChange} variant="enclosed" colorScheme="blue">
            <TabList>
              <Tab>Pessoas</Tab>
              <Tab>Duplas</Tab>
              <Tab>Chaves</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <PeopleManager onSuccess={showSuccessToast} />
              </TabPanel>

              <TabPanel>
                <PairGenerator onSuccess={showSuccessToast} />
              </TabPanel>

              <TabPanel>
                <TournamentBracket onSuccess={showSuccessToast} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  )
}
