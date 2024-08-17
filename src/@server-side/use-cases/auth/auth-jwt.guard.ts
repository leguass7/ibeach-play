import type { NextApiResponse } from 'next'
import { createMiddlewareDecorator, type NextFunction, UnauthorizedException } from 'next-api-decorators'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'
import { parse } from 'next-useragent'

import { secret } from '~/config'

import type { AuthorizedApiRequest, IAuthorizedUser } from './auth.dto'
import { sessionToAuthorizedDto, tokenToAuthorizedDto } from './auth.helper'
import { authOptions } from './auth.options'

/** Decorator para autenticação das rotas com `next-api-decorators` */
export const AuthJwtGuard = createMiddlewareDecorator(async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextFunction) => {
  const unauthorize = (msg = 'unauthorized') => {
    return next(new UnauthorizedException(msg))
  }

  try {
    // // console.log('secret', secret, process.env.NEXTAUTH_URL, process.env.VERCEL_URL)
    const jwt = await getToken({ req, secret })
    const session = await getServerSession(req, res, authOptions)

    console.log('jwt', jwt)
    console.log('session', session)
    let auth: IAuthorizedUser | null = null

    console.log('jwt', jwt)
    if (jwt) auth = tokenToAuthorizedDto(jwt)
    if (!auth && session) auth = sessionToAuthorizedDto(session)

    console.log('auth', auth)

    req.ua = req?.headers['user-agent'] ? parse(req.headers['user-agent']) : null
    if (!auth?.userId) return unauthorize()

    req.auth = auth
    next()
  } catch {
    return unauthorize()
  }
})
