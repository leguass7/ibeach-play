import { CardArena } from '@/components/CardArena'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { SimpleSlider } from '@/components/SimpleSlider'
import { SearchIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

const ClientDashPage: NextPage = () => {
  return (
    <LayoutContainer>
      <Flex justify="center" align="center" mb={8}>
        <Heading as="h1" size="4xl">
          IbeachPlay
        </Heading>
      </Flex>
      <Flex direction="column" justify="center" align="center" mb={6} bgColor="gray.50" padding={8} rounded="full">
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Buscar..." />
          <IconButton
            aria-label="Buscar"
            icon={<SearchIcon />}
            position="absolute"
            right="0"
            top="0"
            height="full"
            variant="outline"
            visibility="hidden"
          />
        </InputGroup>
      </Flex>
      <Box mt={6}>
        <SimpleSlider>
          <Box padding={4}>
            <CardArena />
          </Box>
          <Box padding={4}>
            <CardArena />
          </Box>
          <Box padding={4}>
            <CardArena />
          </Box>
          <Box padding={4}>
            <CardArena />
          </Box>
          <Box padding={4}>
            <CardArena />
          </Box>
        </SimpleSlider>
      </Box>
    </LayoutContainer>
  )
}

export default ClientDashPage
