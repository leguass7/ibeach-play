import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.dto'
import { Body, createHandler, Get, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { CreateUserDTO } from '~/use-cases/user'

class UserHandler {
  @Post()
  @AuthJwtGuard()
  async createUser(@Body(ValidationPipe) body: CreateUserDTO, @Req() req: AuthorizedApiRequest) {
    console.log('req', req?.auth)
    return { success: true, body }
  }

  @Get()
  @AuthJwtGuard()
  async paginateUser(@Query() query: Record<string, unknown>, @Req() req: AuthorizedApiRequest) {
    console.log('req', req?.auth)
    return { success: true, query }
  }
}

export default createHandler(UserHandler)
