import { type Adapter, type AdapterAccount, type AdapterSession, type AdapterUser } from 'next-auth/adapters'

import type { Prisma, PrismaClient } from '@prisma/client'
import { userToAdapterUser, type UserRepository } from '~/use-cases/user'
import { accountToAdapterAccount, type AccountRepository } from '~/use-cases/account'
import type { SessionAndUserDTO, SessionRepository } from '~/use-cases/session'
import { sessionToAdapterSession } from '@/@server-side/use-cases/session/session.helper'

export type CreateAdapter = (userRepository: UserRepository, accountRepository: AccountRepository, sessionRepository: SessionRepository) => Adapter

export const CustomAdapter: CreateAdapter = (userRepository, accountRepository, sessionRepository) => {
  return {
    async createUser(user) {
      const userData = { ...user } as AdapterUser
      const email = user?.email as string

      if (email) {
        // deve atualizar usuário caso já exista
        const userExists = await userRepository.findUserByEmail(email?.toLowerCase().trim())
        if (userExists) userData.id = `${userExists.id}`
        // @ts-ignore
      } else if (userData?.id) delete userData.id

      const result = await userRepository.createAdapterUser(userData)
      return userToAdapterUser(result)
    },

    async getUser(id) {
      const result = await userRepository.findUserById(id)
      return result ? userToAdapterUser(result) : null
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

    async updateUser({ id, ...data }) {
      const user = await userRepository.updateUser(+id, data)
      return userToAdapterUser(user)
    },

    async deleteUser(userId) {
      return userRepository.remove(userId)
    },

    async linkAccount(account): Promise<AdapterAccount> {
      const result = await accountRepository.create(account)
      return accountToAdapterAccount(result)
    },

    async unlinkAccount({ providerAccountId, provider }) {
      const filter = { providerAccountId, provider } as Prisma.AccountWhereUniqueInput
      await accountRepository.remove(filter)
    },

    async createSession({ sessionToken, userId, expires }) {
      const session = await sessionRepository.create({ sessionToken, userId, expires })
      return session
    },

    async getSessionAndUser(sessionToken) {
      const { user, ...rest } = (await sessionRepository.getOneAndUser(sessionToken)) || {}
      const u = user ? userToAdapterUser(user) : null
      const session = rest ? sessionToAdapterSession(rest) : null
      return { user: u, session }
    },

    async updateSession({ sessionToken, ...rest }) {
      const session = await sessionRepository.getOne(sessionToken)
      if (session) {
        const result = await sessionRepository.update(sessionToken, { ...session, ...rest })
        return result
      }
      return session
    },

    async deleteSession(sessionToken) {
      return sessionRepository.remove(sessionToken)
    },

    async createVerificationToken({ identifier, expires, token }) {
      const ds = await getDS()
      const repo = ds.getRepository(VerificationToken)
      const saveData = repo.create({ identifier, expires, token })
      const result = await repo.save(saveData)
      // ds.destroy()
      return result
    },
    async useVerificationToken({ identifier, token }) {
      const ds = await getDS()
      const repo = ds.getRepository(VerificationToken)
      const result = await repo.findOne({ where: { identifier, token } })
      // ds.destroy()
      return result
    }
  }
}
