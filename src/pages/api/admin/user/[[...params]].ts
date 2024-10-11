import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.dto'
import { tryNumber } from '@/helpers/number'
import { instanceToPlain } from 'class-transformer'
import { Body, createHandler, Get, HttpCode, HttpException, Patch, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import { userRepository, type CreateUserDTO } from '~/use-cases/user'

@AuthJwtGuard()
class UserHandler {
  @Post()
  @HttpCode(201)
  @AuthJwtGuard()
  async createUser(@Body(ValidationPipe) body: CreateUserDTO, @Req() req: AuthorizedApiRequest) {
    console.log('req', req?.auth)
    return { success: true, body }
  }

  @Get()
  async paginate(@Query() query: Record<string, unknown>, @Req() req: AuthorizedApiRequest) {
    console.log('req', req?.auth)
    const data = await userRepository.listAll()
    return { success: true, query, data }
  }

  @Get('/:userId')
  @AuthJwtGuard()
  async getUser(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const userId = tryNumber(query?.params?.[0] as string, 0)
    if (!userId) new HttpException(400)

    const user = await userRepository.getOne(userId)
    return { success: true, userId, user: instanceToPlain(user) }
  }

  @Patch('/:userId')
  @AuthJwtGuard()
  async updateUser(@Body(ValidationPipe) body: CreateUserDTO) {
    return { success: true, body }
  }
}

export default createHandler(UserHandler)
