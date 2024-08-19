import type { NextPage } from 'next/types'

type Props = {
  children?: React.ReactNode
}

const AdminDashPage: NextPage<Props> = ({ children }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {children}
    </div>
  )
}

export default AdminDashPage
