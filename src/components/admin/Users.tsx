'use client'

import React from 'react'

import useSWR from 'swr'

// import { Container } from './styles';

export const AdminUsers: React.FC = () => {
  const { data } = useSWR('/api/user')
  console.log('data', data)
  return (
    <div>
      <h1> User</h1>
    </div>
  )
}
