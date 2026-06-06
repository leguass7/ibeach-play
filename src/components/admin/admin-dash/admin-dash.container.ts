import React from 'react'

import { useAdminDash } from '@/services/api/admin/useAdminDash'
import { useRouter } from 'next/navigation'

import { AdminDashView, type AdminDashViewProps } from './admin-dash'

export const AdminDashContainer: React.FC = () => {
  const router = useRouter()
  const { data, isLoading } = useAdminDash()

  const props: AdminDashViewProps = {
    userCount: data?.userCount || 0,
    arenaCount: data?.arenaCount || 0,
    tournamentCount: data?.tournamentCount || 0,
    isLoading,
    onClickUsers: () => router.push('/admin/user'),
    onClickArenas: () => router.push('/admin/arena'),
    onClickTournaments: () => router.push('/admin/tournament')
  }

  return React.createElement(AdminDashView, props)
}
