import { AdminArenas } from '@/components/admin/arena/AdminArenas'
import { BreadcrumbNavigation } from '@/components/breadcrumb-navigation'
import { LayoutContainer } from '@/components/layout/layout-container'
import type { NextPage } from 'next'

const AdminPageArenas: NextPage = () => {
  return (
    <LayoutContainer>
      <BreadcrumbNavigation />
      <AdminArenas />
    </LayoutContainer>
  )
}

export default AdminPageArenas
