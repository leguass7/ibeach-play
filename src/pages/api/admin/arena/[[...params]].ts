import { tryNumber } from '@/helpers/number'
import { Body, createHandler, Get, HttpCode, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { arenaRepository, type CreateArenaDTO } from '~/use-cases/arena'
import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.interface'
import { userRepository } from '~/use-cases/user'

@AuthJwtGuard()
class ArenaHandler {
  @Post()
  @HttpCode(201)
  async create(@Body(ValidationPipe) body: CreateArenaDTO, @Req() req: AuthorizedApiRequest) {
    const createdBy = tryNumber(req?.auth?.userId, 0)
    const data = { ...body, createdBy, createdAt: new Date() }
    const arena = await arenaRepository.create(data)
    return { success: true, arenaId: arena?.id }
  }

  @Get()
  async paginate(@Query() query: Record<string, string>) {
    const data = await userRepository.listAll()
    return { success: true, data, query }
  }

  // @Get('/:arenaId')
  // @AuthJwtGuard()
  // async getOne(@Req() req: AuthorizedApiRequest) {
  //   const { query } = req
  //   const userId = tryNumber(query?.params?.[0] as string, 0)
  //   if (!userId) new HttpException(400)

  //   const user = await userRepository.getOne(userId)
  //   return { success: true, userId, user: instanceToPlain(user) }
  // }

  // @Patch('/:arenaId')
  // @AuthJwtGuard()
  // async update(@Body(ValidationPipe) body: CreateUserDTO) {
  //   return { success: true, body }
  // }
}

export default createHandler(ArenaHandler)
