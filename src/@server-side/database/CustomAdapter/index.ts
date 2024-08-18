/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { Prisma } from '@prisma/client'
import type { Adapter, AdapterSession, AdapterUser } from 'next-auth/adapters'

import { accountToAdapterAccount, type AccountRepository } from '~/use-cases/account'
import { sessionToAdapterSession, type SessionRepository } from '~/use-cases/session'
import { userToAdapterUser, type UserRepository } from '~/use-cases/user'
import { VerificationTokenRepository } from '~/use-cases/verification-token'

export type CreateAdapter = (
  userRepository: UserRepository,
  accountRepository: AccountRepository,
  sessionRepository: SessionRepository,
  verificationTokenRepository: VerificationTokenRepository
) => Adapter

export const CustomAdapter: CreateAdapter = (userRepository, accountRepository, sessionRepository, verificationTokenRepository) => {
  return {
    async createUser(user): Promise<AdapterUser> {
      const userData = { ...user } as AdapterUser
      const result = await userRepository.createAdapterUser(userData)
      return result
    },

    async getUser(id) {
      const user = await userRepository.findUserById(id)
      const result = user ? userToAdapterUser(user) : null
      return result as AdapterUser
    },

    async getUserByEmail(email) {
      const result = await userRepository.findUserByEmail(email)
      if (!result?.accounts?.length) return null // para enganar o next-auth e forçar criar novo usuário
      const user = result ? userToAdapterUser(result) : null
      return user
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const result = await accountRepository.getOne(provider, providerAccountId)
      const user = result?.user ? userToAdapterUser(result?.user) : null
      return user
    },

    async updateUser({ id, ...data }): Promise<AdapterUser> {
      const user = await userRepository.update(+id, data)
      return userToAdapterUser(user) as AdapterUser
    },

    async deleteUser(userId) {
      await userRepository.remove(userId)
    },

    async linkAccount(account) {
      const result = await accountRepository.adapterCreate(account)
      return accountToAdapterAccount(result)
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const filter = { providerAccountId, provider } as Prisma.AccountWhereUniqueInput
      await accountRepository.remove(filter)
    },

    async createSession({ sessionToken, userId, expires }): Promise<AdapterSession> {
      const session = await sessionRepository.create({ sessionToken, userId, expires })
      return sessionToAdapterSession(session) as AdapterSession
    },

    async getSessionAndUser(sessionToken) {
      const { user, ...rest } = (await sessionRepository.getOneAndUser(sessionToken)) || {}
      const u = user ? userToAdapterUser(user) : null
      const session = rest ? sessionToAdapterSession(rest) : null
      return u && session ? { user: u, session } : null
    },

    async updateSession({ sessionToken, ...rest }) {
      const session = await sessionRepository.getOne(sessionToken)
      if (session) {
        const result = await sessionRepository.update(sessionToken, { ...session, ...rest })
        return sessionToAdapterSession(result) as AdapterSession
      }
      return null
    },

    async deleteSession(sessionToken) {
      await sessionRepository.remove(sessionToken)
    },

    async createVerificationToken({ identifier, expires, token }) {
      const result = await verificationTokenRepository.create({ identifier, expires, token })
      return result
    },

    async useVerificationToken({ identifier, token }) {
      const result = await verificationTokenRepository.getOne({ identifier, token })
      return result
    }
  }
}
