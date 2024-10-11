'use client'
import React from 'react'

import { useRouter } from 'next/router'

import { CardStatButton } from '@components/dash/CardStatButton'

export const AdminCardArena: React.FC = () => {
  const navigation = useRouter()

  const handleClick = () => {
    navigation.push('/admin/arenas')
  }

  return <CardStatButton onClick={handleClick} title="Arenas Cadastradas" />
}
