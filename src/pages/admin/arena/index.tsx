import { AdminBreadcrumb } from '@/components/admin/AdminBreadcrumb'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
import type { NextPage } from 'next'

const AdminPageArenas: NextPage = () => {
  return (
    <LayoutContainer>
      <AdminBreadcrumb paths={[{ label: 'Arenas' }]} />
      <h1>AdminPageArenas</h1>
    </LayoutContainer>
  )
}

export default AdminPageArenas
