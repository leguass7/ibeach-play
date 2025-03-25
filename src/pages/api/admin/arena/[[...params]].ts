import { tryNumber } from '@/helpers/number'
import { Body, createHandler, Get, HttpCode, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { arenaRepository, type CreateArenaDTO } from '~/use-cases/arena'
import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'

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
    const arenas = await arenaRepository.listAll()
    return { success: true, arenas, query }
  }
}

export default createHandler(ArenaHandler)
