import { hash } from 'bcryptjs'
// import { createHash } from 'crypto'

export async function generateHashPassword(password: string) {
  const Pbcrypt = await hash(password, 8)
  return Pbcrypt
}
export function generatePassword() {
  return Math.random()
    .toString(36)
    .replace(/[ilLI|`oO0]/g, '')
    .slice(-6)
}
