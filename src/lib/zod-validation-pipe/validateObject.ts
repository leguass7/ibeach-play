/* eslint-disable @typescript-eslint/no-explicit-any */
import { BadRequestException, type ValidationPipeOptions } from 'next-api-decorators'

import type { ZodDtoStatic } from './createZodDto'

export async function validateObject(cls: ZodDtoStatic<any>, value: unknown, _validatorOptions?: ValidationPipeOptions): Promise<any> {
  if (value == null || typeof value !== 'object') value = {}
  const zodSchema = cls?.zodSchema

  if (zodSchema) {
    const parseResult = zodSchema?.safeParse?.(value)
    if (!parseResult?.success) {
      const { error } = parseResult
      const message = error?.errors?.map?.(error => `${error?.path?.join?.('.')}: ${error?.message}`).join(', ')
      throw new BadRequestException('bad_request', [message])
    }

    return parseResult?.data
  }

  return value
}
