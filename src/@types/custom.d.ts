/* eslint-disable @typescript-eslint/no-explicit-any */
import { ButtonProps as ButtonPropsChakra } from '@chakra-ui/react'

type AnyObject = Record<string, any>

declare module '@chakra-ui/react' {
  export interface ButtonProps extends ButtonPropsChakra {
    /** @deprecated @see https://github.com/chakra-ui/chakra-ui/issues/7269 */
    disabled?: boolean
  }
}
