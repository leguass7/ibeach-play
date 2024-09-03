import { createZodDto } from '@/lib/zod-validation-pipe/createZodDto'

import { FormChangePasswordSchema } from './me.validation'

export class ChangePassDto extends createZodDto(FormChangePasswordSchema) {}
