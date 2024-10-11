import React from 'react'

import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link'

const AdminPageArenas: NextPage = () => {
  return (
    <LayoutContainer>
      <Breadcrumb fontWeight="medium" fontSize="sm" textColor={'white'}>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/admin">
            Admim
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Arenas</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <h1>AdminPageArenas</h1>
    </LayoutContainer>
  )
}

export default AdminPageArenas
