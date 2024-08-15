import { isObject, isObjectEmpty } from '@/helpers/validation'
import type { Prisma, PrismaClient } from '@prisma/client'
import type { AdapterAccount } from 'next-auth/adapters'

type UniqueId = {
  identifier: string
  token: string
}

export class VerificationTokenRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getOne({ identifier, token }: UniqueId) {
    const user = await this.prisma.verificationToken.findFirst({ where: { identifier, token } })
    return user
  }

  async create(data: Prisma.VerificationTokenCreateInput) {
    const user = await this.prisma.verificationToken.create({ data: data as Prisma.VerificationTokenCreateInput })
    return user
  }

  async remove(providerAccountId: Prisma.AccountWhereUniqueInput) {
    if (providerAccountId || !isObject(providerAccountId) || isObjectEmpty(providerAccountId)) return null
    const deleted = await this.prisma.account.delete({ where: providerAccountId })
    return deleted
  }
}
