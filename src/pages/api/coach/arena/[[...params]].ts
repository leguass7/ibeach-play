import { arenaService } from '@/@server-side/use-cases/arena'
import { AuthJwtGuard } from '@/@server-side/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.interface'
import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

@AuthJwtGuard()
class CoachArenaHandler {
  @HttpCode(200)
  @Get('/options')
  async list(@Req() req: AuthorizedApiRequest) {
    const coachId = req.auth?.userId
    if (!coachId) throw new Error('Unauthorized')
    const arenas = await arenaService.listOptions()

    return { success: true, arenas }
  }
}

export default createHandler(CoachArenaHandler)
