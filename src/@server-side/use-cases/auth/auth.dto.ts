import type { NextApiRequest } from 'next'
import type { UserAgent } from 'next-useragent'

type Q = Partial<{ [key: string]: string | string[] }>
export type AuthorizedApiRequest<Body = AnyObject, Query = Q> = NextApiRequest & {
  ua?: UserAgent | null
  auth: IAuthorizedUser
  body: Body
  query: Query
}

export interface PublicApiRequest<Body = AnyObject> extends NextApiRequest {
  ua?: UserAgent | null
  body: Body
}

export interface IAuthorizedUser {
  userId: string
  name: string
  email?: string
  level?: number
}
