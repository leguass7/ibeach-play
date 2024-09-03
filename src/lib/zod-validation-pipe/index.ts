import type { ClassTransformOptions } from 'class-transformer'
import type { ValidatorOptions } from 'class-validator'

import type { ZodDtoStatic } from './createZodDto'
import { validateObject } from './validateObject'

/** @deprecated não funciona */
export interface ValidationPipeOptions extends ValidatorOptions {
  transformOptions?: ClassTransformOptions
}

type ParameterMetadata<TMeta = unknown> = { metaType?: ZodDtoStatic<TMeta> }
type Parameter<TOutput, TMeta = unknown> = (value: TOutput, metadata?: ParameterMetadata<TMeta>) => TOutput | undefined

/**
 * Validates request body values and gets them as DTOs.
 * @see https://github.com/instantcommerce/next-api-decorators/discussions/480
 */
export function ZodValidationPipe(options?: ValidationPipeOptions): Parameter<unknown> {
  // if (process.env.NODE_ENV === 'development') {
  //   ;(['class-validator', 'class-transformer'] as const).forEach(_requiredPackage => {
  //     //
  //   })
  // }

  return (value: unknown, metadata?: ParameterMetadata) => {
    if (!metadata?.metaType) {
      return value
    }

    return validateObject(metadata?.metaType, value, options)
  }
}
