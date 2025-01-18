/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AuthJwtGuard } from '@/@server-side/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.interface'
import { classroomRepository } from '@/@server-side/use-cases/classroom'
import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

@AuthJwtGuard()
class CoachClassroomHandler {
  @HttpCode(200)
  @Get('/')
  async list(@Req() req: AuthorizedApiRequest) {
    const { auth, query } = req
    const coachId = auth?.userId
    if (!coachId) throw new Error('Unauthorized')

    const arenaId = query?.arenaId ? Number(query.arenaId) : undefined
    const classrooms = await classroomRepository.findAll(coachId, arenaId)

    return { success: true, classrooms }
  }
}

export default createHandler(CoachClassroomHandler)
