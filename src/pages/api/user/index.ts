import { Body, createHandler, Post, ValidationPipe } from 'next-api-decorators'

import type { CreateUserDTO } from '~/use-cases/user'

class UserHandler {
  @Post()
  async createUser(@Body(ValidationPipe) body: CreateUserDTO) {
    return { success: true }
  }
}

export default createHandler(UserHandler)
