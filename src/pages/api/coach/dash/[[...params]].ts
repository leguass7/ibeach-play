import { arenaService } from '@/@server-side/use-cases/arena'
import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

import type { PublicApiRequest } from '@/@server-side/use-cases/auth/auth.interface'

class CoachDashHandler {
  @HttpCode(200)
  @Get('/')
  async list(@Req() req: PublicApiRequest) {
    const { query } = req
    const search = query?.search as string

    const arenas = await arenaService.search(search)
    return { success: true, arenas }
  }
}

export default createHandler(CoachDashHandler)
