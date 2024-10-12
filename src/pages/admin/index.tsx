'use client'
import { AdminCardArena } from '@/components/admin/AdminCardArena'
import { CardStatButton } from '@/components/dash/CardStatButton'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import type { NextPage } from 'next/types'

type Props = {
  children?: React.ReactNode
}

const AdminDashPage: NextPage<Props> = ({ children }) => {
  const navigation = useRouter()

  const handleClick = (path: string) => {
    return () => {
      navigation.push(path)
    }
  }
  return (
    <LayoutContainer>
      <SimpleGrid gap={5} columns={{ lg: 4, xl: 6, md: 3, base: 1, sm: 2 }}>
        <GridItem>
          <AdminCardArena />
        </GridItem>
        <GridItem>
          <CardStatButton title="Usuários cadastrados" onClick={handleClick('/admin/user')} />
        </GridItem>
        <GridItem h="10" bg="blue.500" />
        <GridItem h="10" bg="blue.500" />
      </SimpleGrid>
      {children}
    </LayoutContainer>
  )
}

export default AdminDashPage
