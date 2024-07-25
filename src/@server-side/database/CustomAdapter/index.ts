import { type Adapter, type AdapterAccount, type AdapterSession, type AdapterUser } from 'next-auth/adapters'

import type { Prisma, PrismaClient } from '@prisma/client'
import { userToAdapterUser, type UserRepository } from '~/use-cases/user'
import type { AccountRepository } from '@/@server-side/use-cases/account/account.repository'
import { accountToAdapterAccount } from '@/@server-side/use-cases/account'

export type CreateAdapter = (userRepository: UserRepository, accountRepository: AccountRepository) => Adapter

export const CustomAdapter: CreateAdapter = (userRepository, accountRepository) => {
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
      const ds = await getDS()
      const repo = ds.getRepository(Session)
      const saveData = repo.create({ sessionToken, userId, expires })
      const result = await repo.save(saveData)
      // ds.destroy()
      return result
    },
    async getSessionAndUser(sessionToken) {
      const ds = await getDS()
      const repo = ds.getRepository(Session)
      const { user, ...session } = await repo.findOne({ where: { sessionToken }, relations: { user: true } })
      const result: { session: AdapterSession; user: AdapterUser } = { user: userDto(user), session }
      // ds.destroy()
      return result
    },
    async updateSession({ sessionToken }) {
      const ds = await getDS()
      const repo = ds.getRepository(Session)
      const session = await repo.findOne({ where: { sessionToken } })
      if (session) {
        const saveData = repo.create(session)
        const result = await repo.save({ ...saveData, sessionToken })
        // ds.destroy()
        return result
      }
      // ds.destroy()
      return null
    },
    async deleteSession(sessionToken) {
      const ds = await getDS()
      const repo = ds.getRepository(Session)
      await repo.delete({ sessionToken })
      // ds.destroy()
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
