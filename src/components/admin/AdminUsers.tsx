'use client'

import React from 'react'

import { useUser } from '@/services/api/user/useUser'

// import { Container } from './styles';

export const AdminUsers: React.FC = () => {
  // const { data } = useSWR('/api/user')
  const { data, isLoading } = useUser()
  console.log('data', isLoading, data)
  return (
    <div>
      <h1> User</h1>
    </div>
  )
}
