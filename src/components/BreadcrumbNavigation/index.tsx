import type React from 'react'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, type BreadcrumbProps } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const predefinedPaths = [
  { label: 'Home', path: '/' },
  { label: 'Admin', path: 'admin' },
  { label: 'Turmas', path: 'classroom' },
  { label: 'Treinador', path: 'coach' }
]

export type BreadcrumbNavigationProps = BreadcrumbProps

export const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = props => {
  const router = useRouter()
  const currentPaths = router.asPath.split('/').filter(path => path)

  const generatePathLinks = () => {
    return currentPaths.map((path, index) => {
      const href = `/${currentPaths.slice(0, index + 1).join('/')}`
      const predefinedPath = predefinedPaths.find(p => p.path === path)
      const label = predefinedPath ? predefinedPath.label : path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ')

      return (
        <BreadcrumbItem key={path}>
          <BreadcrumbLink as={Link} href={href}>
            {label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      )
    })
  }

  return (
    <Breadcrumb fontWeight="medium" fontSize="md" py={3} color={'#ffffff'} {...props}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} href="/">
          Home
        </BreadcrumbLink>
      </BreadcrumbItem>
      {generatePathLinks()}
    </Breadcrumb>
  )
}
