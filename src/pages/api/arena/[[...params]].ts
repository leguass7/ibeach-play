import { arenaService } from '@/@server-side/use-cases/arena'
import { createHandler, Get, HttpCode, Req } from 'next-api-decorators'

import type { PublicApiRequest } from '~/use-cases/auth/auth.dto'

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
