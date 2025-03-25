import { instanceToPlain } from 'class-transformer'
import { Body, createHandler, Delete, Get, HttpCode, HttpException, Patch, Post, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'
import { tournamentRepository } from '~/use-cases/tournament'
import { TournamentDTO } from '~/use-cases/tournament/tournament.dto'

@AuthJwtGuard()
class TournamentHandler {
  @Post()
  @HttpCode(201)
  async createTournament(@Body(ValidationPipe) body: TournamentDTO, @Req() req: AuthorizedApiRequest) {
    const { auth } = req
    const tournament = await tournamentRepository.create({
      ...body,
      createdBy: auth.userId,
      endDate: new Date(),
      startDate: new Date()
    })
    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Get()
  async listTournaments() {
    const tournaments = await tournamentRepository.listAll()
    return { success: true, tournaments: instanceToPlain(tournaments) }
  }

  @Get('/:stageId')
  async getStage(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const stageId = Number(query?.params?.[0] || 0) as number
    if (!stageId) throw new HttpException(400, 'id is required')

    const stage = await tournamentRepository.getOne(stageId)
    if (!stage) throw new HttpException(404, 'Tournament Stage not found')

    return { success: true, stage: instanceToPlain(stage) }
  }

  @Patch('/:stageId')
  async updateTournament(@Body(ValidationPipe) body: TournamentStageDTO, @Req() req: AuthorizedApiRequest) {
    const { query } = req
    const tournamentId = Number(query?.params?.[0] || 0) as number
    if (!tournamentId) throw new HttpException(400, 'Tournament ID is required')

    const tournament = await tournamentRepository.update(tournamentId, {
      ...body,
      updatedBy: req.auth.userId
    })

    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Delete('/:tournamentId')
  @HttpCode(204)
  async deleteTournament(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const tournamentId = Number(query?.params?.[0] || 0) as number
    if (!tournamentId) throw new HttpException(400, 'Tournament ID is required')

    await tournamentRepository.delete(tournamentId)
    return { success: true }
  }
}

export default createHandler(TournamentHandler)
