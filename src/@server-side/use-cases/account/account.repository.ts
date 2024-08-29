import { isObject, isObjectEmpty } from '@/helpers/validation'
import type { Prisma } from '@prisma/client'
import type { AdapterAccount } from 'next-auth/adapters'
import type { ProviderType } from 'next-auth/providers/index'

import type { PrismaClientSingleton } from '~/database'
export class AccountRepository {
  constructor(private readonly prisma: PrismaClientSingleton) {}

  async adapterCreate(data: AdapterAccount) {
    const d: Prisma.AccountUncheckedCreateInput = {
      ...data,
      provider: data.provider,
      providerAccountId: data.providerAccountId,
      userId: +data.userId,
      type: data.type as ProviderType
    }
    const account = await this.prisma.account.create({ data: d })
    return account
  }

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
