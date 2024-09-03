import { arenaRepository, type CreateArenaDTO } from '@/@server-side/use-cases/arena'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.dto'
import { tryNumber } from '@/helpers/number'
import { Body, createHandler, HttpCode, Post, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'

class ArenaHandler {
  @Post()
  @HttpCode(201)
  @AuthJwtGuard()
  async create(@Body(ValidationPipe) body: CreateArenaDTO, @Req() req: AuthorizedApiRequest) {
    const createdBy = tryNumber(req?.auth?.userId, 0)
    const data = { ...body, createdBy, createdAt: new Date() }
    const arena = await arenaRepository.create(data)
    return { success: true, arenaId: arena?.id }
  }

  // @Get()
  // @AuthJwtGuard()
  // async paginate(@Query() query: Record<string, unknown>, @Req() req: AuthorizedApiRequest) {
  //   console.log('req', req?.auth)
  //   const data = await userRepository.listAll()
  //   return { success: true, query, data }
  // }

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
