import { CardWebArena } from '@/components/chakra-ui/CardWebArena'
import type { NextPage } from 'next/types'

type Props = {}

const ClientDashPage: NextPage<Props> = ({}) => {
  return (
    <div>
      <h1>Client Dashboard</h1>
      <CardWebArena />
    </div>
  )
}

export default ClientDashPage
