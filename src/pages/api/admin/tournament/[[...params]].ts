import { instanceToPlain } from 'class-transformer'
import { Body, createHandler, Delete, Get, HttpCode, HttpException, Patch, Post, Req, ValidationPipe } from 'next-api-decorators'

import { AuthJwtGuardAdmin } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'
import { tournamentRepository } from '~/use-cases/tournament'
import { CreateTournamentDTO, UpdateTournamentDTO } from '~/use-cases/tournament/tournament.dto'

@AuthJwtGuardAdmin()
class TournamentHandler {
  @Post()
  @HttpCode(201)
  async createTournament(@Body(ValidationPipe) body: CreateTournamentDTO, @Req() req: AuthorizedApiRequest) {
    const { auth } = req
    const createdBy = auth.userId
    const tournament = await tournamentRepository.create({ ...body, createdBy })
    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Get()
  async listTournaments() {
    const tournaments = await tournamentRepository.listAll()
    return { success: true, tournaments: instanceToPlain(tournaments) }
  }

  @Get('/:tournamentId')
  async getTournament(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const tournamentId = Number(query?.params?.[0] || 0) as number
    if (!tournamentId) throw new HttpException(400, 'Tournament ID is required')

    const tournament = await tournamentRepository.getOne(tournamentId)
    if (!tournament) throw new HttpException(404, 'Tournament not found')

    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Patch('/:tournamentId')
  async updateTournament(@Body(ValidationPipe) body: UpdateTournamentDTO, @Req() req: AuthorizedApiRequest) {
    const { query, auth } = req
    const tournamentId = Number(query?.params?.[0] || 0) as number
    if (!tournamentId) throw new HttpException(400, 'Tournament ID is required')

    const updatedBy = auth.userId
    const tournament = await tournamentRepository.update(tournamentId, { ...body, updatedBy })

    return { success: true, tournament: instanceToPlain(tournament) }
  }

  @Delete('/:tournamentId')
  @HttpCode(200)
  async deleteTournament(@Req() req: AuthorizedApiRequest) {
    const { query } = req
    const tournamentId = Number(query?.params?.[0] || 0) as number
    if (!tournamentId) throw new HttpException(400, 'id is required')

    await tournamentRepository.delete(tournamentId)
    return { success: true }
  }
}

export default createHandler(TournamentHandler)
