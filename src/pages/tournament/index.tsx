import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { TournamentProvider } from '@/components/tournament-sorted/lib/tournament-provider'
import TournamentComponentPage from '@/components/tournament-sorted/TournamentComponentPage'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'

const TournamentPage: NextPage = () => {
  const navigation = useRouter()

  const handleGoHome = () => {
    navigation.push('/')
  }

  return (
    <LayoutContainer>
      <TournamentProvider>
        <TournamentComponentPage />
      </TournamentProvider>
    </LayoutContainer>
  )
}

export default TournamentPage
