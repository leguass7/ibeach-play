import type { Account } from '@prisma/client'
import type { AccountDTO } from './account.dto'
import type { AdapterAccount } from 'next-auth/adapters'
import type { ProviderType } from 'next-auth/providers/index'

export function accountToAdapterAccount(data: AccountDTO): AdapterAccount {
  const {
    access_token,
    expires_at,
    id_token,
    provider,
    providerAccountId,
    refresh_token,
    scope,
    session_state,
    token_type,
    type,
    userId
    // createdAt,
    // updatedAt
  } = data as Account

  const result: AdapterAccount = {
    userId: userId ? `${userId}` : '',
    access_token: access_token || '',
    expires_at: expires_at || 0,
    id_token: id_token || '',
    provider,
    providerAccountId: providerAccountId || '',
    refresh_token: refresh_token || '',
    scope: scope || '',
    session_state: session_state || '',
    token_type: token_type || '',
    type: type as ProviderType
    // createdAt: createdAt?.toISOString() || '',
    // updatedAt: updatedAt?.toISOString() || ''
  }

  return result
}
