import type { CreateUserDTO } from '~/use-cases/user'
import { Body, createHandler, Post, ValidationPipe } from 'next-api-decorators'

class UserHandler {
  @Post()
  async createUser(@Body(ValidationPipe) body: CreateUserDTO) {
    return { success: true }
  }
}

export default createHandler(UserHandler)
