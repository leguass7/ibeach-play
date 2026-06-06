'use client'
import type React from 'react'

import { apiService } from '@/services/api/api.service'
import { SWRConfig } from 'swr'

type Props = { children: React.ReactNode }

export const SWRProvider: React.FC<Props> = ({ children }) => {
  return <SWRConfig value={{ fetcher: apiService.getFetcher() }}>{children}</SWRConfig>
}
