import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { NextPage } from 'next/types'

type Props = {
  children?: React.ReactNode
}

const AdminDashPage: NextPage<Props> = ({ children }) => {
  return (
    <LayoutContainer>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      <h1>Admin Dashboard</h1>
      {children}
    </LayoutContainer>
  )
}

export default AdminDashPage
