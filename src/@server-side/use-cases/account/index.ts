import prisma from '~/database'

import { AccountRepository } from './account.repository'
export * from './account.dto'
export * from './account.helper'
export type { AccountRepository }

const accountRepository = new AccountRepository(prisma)

export { accountRepository }
