import { ZodValidationPipe } from '@/lib/zod-validation-pipe'
import { ChangePassDto } from '@/services/api/me'
import { Body, createHandler, HttpCode, Post, Req } from 'next-api-decorators'

import { AuthJwtGuard } from '~/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.dto'
import { userService } from '~/use-cases/user'

class MeHandler {
  @Post('/change-pass')
  @HttpCode(200)
  @AuthJwtGuard()
  async changePass(@Body(ZodValidationPipe) body: ChangePassDto, @Req() req: AuthorizedApiRequest) {
    const { userId } = req?.auth
    const updated = await userService.chagePassword(userId, body.password)
    return { success: !!updated }
  }
}

export default createHandler(MeHandler)
