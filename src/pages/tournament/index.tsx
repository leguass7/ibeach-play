import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { TournamentStageProvider } from '@/components/tournament-sorted/TournamentStageProvider'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const TournamentPage: NextPage = () => {
  const navigation = useRouter()

  const handleGoHome = () => {
    navigation.push('/')
  }

  return (
    <LayoutContainer>
      <></>
    </LayoutContainer>
  )
}

export default TournamentPage
