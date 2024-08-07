import type { Account } from '@prisma/client'

export type AccountDTO = Partial<Account>

export class CreateAccountDTO {
  email: string
  name!: string
}
