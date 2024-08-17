import { Body, createHandler, Get, Param, Patch, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { CreateUserDTO } from '~/use-cases/user'

class UserHandler {
  @Patch('/:userId')
  @AuthJwtGuard()
  async createUser(@Body(ValidationPipe) body: CreateUserDTO) {
    return { success: true, body }
  }

  @Get('/:userId')
  @AuthJwtGuard()
  async paginateUser(@Param('id') userId: string) {
    console.log('userId', typeof userId, userId)
    return { success: true, userId }
  }
}

export default createHandler(UserHandler)
