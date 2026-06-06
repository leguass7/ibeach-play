import { LayoutContainer } from '@/components/layout/layout-container'
import { TournamentStageProviderOld } from '@/components/tournament-sorted/tournament-stage-provider-old'
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
