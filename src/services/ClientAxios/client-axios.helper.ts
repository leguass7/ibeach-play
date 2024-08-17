export function normalizeToken(token: string = ''): string | null {
  if (!token) return null
  return token.startsWith('Bearer') ? token : `Bearer ${token}`
}
