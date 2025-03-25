import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

import { arenaService } from '~/use-cases/arena'
import type { PublicApiRequest } from '~/use-cases/auth/auth.interface'

class ArenaPublicHandler {
  @HttpCode(200)
  @Get('/search')
  async search(@Req() req: PublicApiRequest) {
    const { query } = req
    const search = query?.search as string

    const arenas = await arenaService.search(search)
    return { success: true, arenas }
  }
}

export default createHandler(ArenaPublicHandler)
