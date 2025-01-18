import { AuthJwtGuard } from '@/@server-side/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.interface'
import { classroomRepository } from '@/@server-side/use-cases/classroom'
import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

@AuthJwtGuard()
class CoachDashHandler {
  @HttpCode(200)
  @Get('/')
  async dash(@Req() req: AuthorizedApiRequest) {
    const { auth } = req
    const coachId = auth?.userId
    if (!coachId) throw new Error('Unauthorized')

    const [classroomCount] = await Promise.all([
      classroomRepository.count(coachId)
      //
    ])

    return { success: true, classroomCount }
  }
}

export default createHandler(CoachDashHandler)
