import prisma from '@/@server-side/database'
import { AccountRepository } from './account.repository'
export * from './account.dto'
export * from './account.helper'

const accountRepository = new AccountRepository(prisma)

export { accountRepository }
