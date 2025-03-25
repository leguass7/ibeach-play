import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

import { arenaRepository } from '~/use-cases/arena'
import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.interface'
import { tournamentRepository } from '~/use-cases/tournament'
import { userRepository } from '~/use-cases/user'

@AuthJwtGuard()
class AdminDashHandler {
  @HttpCode(200)
  @Get('/')
  async dash(@Req() req: AuthorizedApiRequest) {
    const { auth } = req
    const userId = auth?.userId
    if (!userId) throw new Error('Unauthorized')

    const [arenaCount, tournamentCount, userCount] = await Promise.all([
      arenaRepository.count(),
      tournamentRepository.count(),
      userRepository.count()
      //
    ])

    return { success: true, arenaCount, tournamentCount, userCount }
  }
}

export default createHandler(AdminDashHandler)
