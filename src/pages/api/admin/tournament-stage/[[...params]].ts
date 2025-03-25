import { instanceToPlain } from 'class-transformer'
import { Body, createHandler, Delete, Get, HttpCode, HttpException, Patch, Post, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuardAdmin } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'
import { tournamentStageRepository } from '~/use-cases/tournament-stage'
import { CreateTournamentStageDTO, UpdateTournamentStageDTO } from '~/use-cases/tournament-stage'

@AuthJwtGuardAdmin()
class TournamentHandler {
  @Post()
  @HttpCode(201)
  async createTournament(@Body(ValidationPipe) body: CreateTournamentStageDTO, @Req() req: AuthorizedApiRequest) {
    const { auth } = req
    const createdBy = auth.userId
    const tournament = await tournamentStageRepository.create({ ...body, createdBy })
    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Get()
  async listTournaments() {
    const tournaments = await tournamentStageRepository.listAll()
    return { success: true, tournaments: instanceToPlain(tournaments) }
  }

  @Get('/:stageId')
  async getStage(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const stageId = Number(query?.params?.[0] || 0) as number
    if (!stageId) throw new HttpException(400, 'id is required')

    const tournamentStage = await tournamentStageRepository.getOne(stageId)
    if (!tournamentStage) throw new HttpException(404, 'Tournament Stage not found')

    return { success: true, tournamentStage: instanceToPlain(tournamentStage) }
  }

  @Patch('/:stageId')
  async updateTournament(@Body(ValidationPipe) body: UpdateTournamentStageDTO, @Req() req: AuthorizedApiRequest) {
    const { query, auth } = req
    const stageId = Number(query?.params?.[0] || 0) as number
    if (!stageId) throw new HttpException(400, 'Tournament ID is required')

    const updatedBy = auth.userId
    const tournamentStage = await tournamentStageRepository.update(stageId, { ...body, updatedBy })

    return { success: true, tournamentStage: instanceToPlain(tournamentStage) }
  }

  @Delete('/:stageId')
  @HttpCode(204)
  async deleteTournament(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const stageId = Number(query?.params?.[0] || 0) as number
    if (!stageId) throw new HttpException(400, 'Tournament ID is required')

    await tournamentStageRepository.delete(stageId)
    return { success: true }
  }
}

export default createHandler(TournamentHandler)
