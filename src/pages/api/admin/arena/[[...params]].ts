import { tryNumber } from '@/helpers/number'
import { instanceToPlain } from 'class-transformer'
import { Body, createHandler, Delete, Get, HttpCode, HttpException, Patch, Post, Query, Req, ValidationPipe } from 'next-api-decorators'

import { arenaRepository, CreateArenaDTO, type UpdateArenaDTO } from '~/use-cases/arena'
import { AuthJwtGuardAdmin } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'

@AuthJwtGuardAdmin()
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

  @Get('/:arenaId')
  async getArena(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const id = Number(query?.params?.[0] || 0) as number
    if (!id) throw new HttpException(400, 'id is required')

    const arena = await arenaRepository.getOne(id)
    if (!arena) throw new HttpException(404, 'Arena not found')

    return { success: true, arena: instanceToPlain(arena) }
  }

  @Patch('/:arenaId')
  async updateArena(@Body(ValidationPipe) body: UpdateArenaDTO, @Req() req: AuthorizedApiRequest) {
    const { query, auth } = req

    const updatedBy = auth.userId
    const arenaId = Number(query?.params?.[0] || 0) as number
    if (!arenaId) throw new HttpException(400, 'id is required')

    const arena = await arenaRepository.update(arenaId, { ...body, updatedBy })

    return { success: true, arena: instanceToPlain(arena) }
  }

  @Delete('/:arenaId')
  async removeArena(@Req() req: AuthorizedApiRequest) {
    const { query } = req

    const arenaId = Number(query?.params?.[0] || 0) as number
    if (!arenaId) throw new HttpException(400, 'id is required')

    console.log('arenaId', arenaId)
    const arena = await arenaRepository.remove(arenaId)

    return { success: true, arena: instanceToPlain(arena) }
  }
}

export default createHandler(ArenaHandler)
