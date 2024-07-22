import type { NextApiRequest } from 'next'
import type { UserAgent } from 'next-useragent'

type Q = Partial<{ [key: string]: string | string[] }>
export type AuthorizedApiRequest<Body = Record<string, any>, Query = Q> = NextApiRequest & {
  ua?: UserAgent | null
  auth: IAuthorizedUser
  body: Body
  query: Query
}

export interface PublicApiRequest<Body = Record<string, any>> extends NextApiRequest {
  ua?: UserAgent | null
  body: Body
}

export interface IAuthorizedUser {
  userId: string
  name: string
  email?: string
  level?: number
}
