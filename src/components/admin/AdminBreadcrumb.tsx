import React from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import Link from 'next/link'

type LinkType = {
  href?: string
  label: string
}

export type AdminBreadcrumbProps = {
  paths: LinkType[]
}

export const AdminBreadcrumb: React.FC<AdminBreadcrumbProps> = ({ paths }) => {
  const renderLink = (label: string, href?: string) => {
    if (!!href)
      return (
        <BreadcrumbLink href={href} as={Link}>
          {label}
        </BreadcrumbLink>
      )
    return <BreadcrumbLink>{label}</BreadcrumbLink>
  }
  return (
    <Breadcrumb fontWeight="medium" fontSize="sm" textColor={'white'}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/admin">
          Admim
        </BreadcrumbLink>
      </BreadcrumbItem>
      {paths?.map(path => {
        return <BreadcrumbItem key={`item-${path?.label}`}>{renderLink(path?.label, path.href)}</BreadcrumbItem>
      })}
    </Breadcrumb>
  )
}
