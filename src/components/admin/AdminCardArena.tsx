'use client'
import React from 'react'

import { useRouter } from 'next/router'

import { CardStat as CardStatButton } from '@components/ui/card-stat'

export const AdminCardArena: React.FC = () => {
  const navigation = useRouter()

  const handleClick = () => {
    navigation.push('/admin/arenas')
  }

  return <CardStatButton onClick={handleClick} title="Arenas Cadastradas" />
}
