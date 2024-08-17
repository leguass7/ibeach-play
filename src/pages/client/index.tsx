import { CardArena } from '@/components/CardArena'
import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next/types'

type Props = {}

const ClientDashPage: NextPage<Props> = ({}) => {
  return (
    <Box>
      <CardArena />
    </Box>
  )
}

export default ClientDashPage
