import { isObject, isObjectEmpty } from '@/helpers/validation'
import type { Prisma, PrismaClient } from '@prisma/client'
import type { AdapterAccount } from 'next-auth/adapters'
import type { ProviderType } from 'next-auth/providers/index'

import type { AccountDTO } from './account.dto'

type UniqueId = {
  providerAccountId: string
  provider: string
}

export class AccountRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getOne(provider: string, providerAccountId: string) {
    const user = await this.prisma.account.findFirst({ where: { provider, providerAccountId }, include: { user: true } })
    return user
  }

  async create(data: Prisma.AccountCreateInput | AdapterAccount) {
    const user = await this.prisma.account.create({ data: data as Prisma.AccountCreateInput })
    return user
  }

  async remove(providerAccountId: Prisma.AccountWhereUniqueInput) {
    if (providerAccountId || !isObject(providerAccountId) || isObjectEmpty(providerAccountId)) return null
    const deleted = await this.prisma.account.delete({ where: providerAccountId })
    return deleted
  }
}
