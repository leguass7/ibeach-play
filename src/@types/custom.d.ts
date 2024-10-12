import { type ButtonProps as ButtonPropsChakra } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyObject = Record<string, any>

declare module '@chakra-ui/react' {
  export interface ButtonProps extends ButtonPropsChakra {
    /** @deprecated @see https://github.com/chakra-ui/chakra-ui/issues/7269 */
    disabled?: boolean
  }
}
