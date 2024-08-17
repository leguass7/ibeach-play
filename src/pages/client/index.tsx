import { CardArena } from '@/components/CardArena'
import { SimpleSlider } from '@/components/SimpleSlider'
import { Box, Text, Container } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

type Props = {}

const ClientDashPage: NextPage<Props> = ({}) => {
  return (
    <Container maxW={'container.xl'}>
      <Box mt={40}>
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
    </Container>
  )
}

export default ClientDashPage
