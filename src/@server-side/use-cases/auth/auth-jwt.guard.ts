import type { NextApiResponse } from 'next'
import { createMiddlewareDecorator, type NextFunction, UnauthorizedException } from 'next-api-decorators'
import { getToken } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { parse } from 'next-useragent'

import { secret } from '~/config'

import type { AuthorizedApiRequest } from './auth.dto'
import { authorizedDto } from './auth.helper'
import type { Session } from 'next-auth'

/** Decorator para autenticação das rotas com `next-api-decorators` */
export const AuthJwtGuard = createMiddlewareDecorator(async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextFunction) => {
  const unauthorize = (msg = 'unauthorized') => {
    return next(new UnauthorizedException(msg))
  }

  try {
    // // console.log('secret', secret, process.env.NEXTAUTH_URL, process.env.VERCEL_URL)
    const jwt = await getToken({ req, secret })
    let session: Session | null = null
    if (!jwt) {
      const session = await getSession({ req })
      if (!session) return unauthorize()
    }

    req.auth = authorizedDto(jwt || session)
    req.ua = req?.headers['user-agent'] ? parse(req.headers['user-agent']) : null
    if (!req.auth?.userId) return unauthorize()

    next()
  } catch (error) {
    return unauthorize()
  }
})
