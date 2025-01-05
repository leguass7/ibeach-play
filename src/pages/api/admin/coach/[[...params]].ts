import { tryNumber } from '@/helpers/number'
import { Body, createHandler, Get, HttpCode, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { arenaRepository, type CreateArenaDTO } from '~/use-cases/arena'
import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.dto'
import { userRepository } from '~/use-cases/user'

@AuthJwtGuard()
class AdminCoachHandler {
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
}

export default createHandler(AdminCoachHandler)
