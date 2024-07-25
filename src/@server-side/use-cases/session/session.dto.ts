import type { Session, User } from '@prisma/client'

export type SessionDTO = Partial<Session>

export type SessionAndUserDTO = Session & {
  user?: User
}
