import { AuthJwtGuard } from '@/@server-side/use-cases/auth/auth-jwt.guard'
import { ZodValidationPipe } from '@/lib/zod-validation-pipe'
import { createZodDto } from '@/lib/zod-validation-pipe/createZodDto'
import { FormChangePasswordSchema } from '@/services/api/me'
import { Body, createHandler, HttpCode, Post, Req } from 'next-api-decorators'

import type { AuthorizedApiRequest } from '~/use-cases/auth/auth.dto'

class ChangePassDto extends createZodDto(FormChangePasswordSchema) {}

class MeHandler {
  @Post('/change-pass')
  @HttpCode(200)
  @AuthJwtGuard()
  async changePass(@Body(ZodValidationPipe) body: ChangePassDto, @Req() req: AuthorizedApiRequest) {
    const { userId } = req?.auth
    console.log('body', userId, body)

    return { success: true }
  }
}

export default createHandler(MeHandler)
