'use client'

import { useState } from 'react'

import { Box, Heading, Tabs, TabList, Tab, TabPanels, TabPanel, useToast, Card, CardHeader, Flex, CardBody } from '@chakra-ui/react'
import Head from 'next/head'

import PairGenerator from '../pair-generator'
import PeopleManager from '../people-manager'
import { TournamentStageProvider } from '../tournament-stage-provider'

type TournamentComponentPageProps = {
  tournamentId: number
  stageId: number
}

export const TournamentComponentPage: React.FC<TournamentComponentPageProps> = ({ tournamentId, stageId }) => {
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
        <title>Sorteio de Chaves</title>
        <meta name="description" content="Aplicação para sorteio de chaves para torneio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TournamentStageProvider stageId={stageId} tournamentId={tournamentId}>
        <Card>
          <Tabs index={tabIndex} onChange={handleTabsChange} variant="enclosed" colorScheme="blue">
            <CardHeader>
              <Flex gap={4}>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Box>
                    <Heading size="md">Sorteio de Chaves</Heading>
                  </Box>
                </Flex>
                <TabList>
                  <Tab>Pessoas</Tab>
                  <Tab>Duplas</Tab>
                  {/* <Tab>Chaves</Tab> */}
                </TabList>
              </Flex>
            </CardHeader>
            <CardBody>
              <TabPanels>
                <TabPanel>
                  <PeopleManager onSuccess={showSuccessToast} />
                </TabPanel>

                <TabPanel>
                  <PairGenerator onSuccess={showSuccessToast} />
                </TabPanel>

                {/* <TabPanel>
                  <TournamentBracket onSuccess={showSuccessToast} />
                </TabPanel> */}
              </TabPanels>
            </CardBody>
          </Tabs>
        </Card>
      </TournamentStageProvider>
    </>
  )
}
