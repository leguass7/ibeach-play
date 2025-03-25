import { AdminArenas } from '@/components/admin/arena/AdminArenas'
import { BreadcrumbNavigation } from '@/components/BreadcrumbNavigation'
import { LayoutContainer } from '@/components/layout/LayoutContainer'
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
