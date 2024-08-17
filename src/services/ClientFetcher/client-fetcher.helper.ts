// export function normalizeUrl(path?: string, queryParams: any = {}): string {
//   const [base = '', query = ''] = `${path}`.split('?')
//   const params: any = querystring(query)
//   return [base.replace(/^(.*)\/$/, '$1'), querystring({ ...params, ...queryParams })].join('?')
// }

import type { RequestParams } from './client.fetcher.dto'

export function setUrlParams(oldUrl: string, { params = {} }: RequestParams = {}): string | null {
  if (!oldUrl) return null
  const url = new URL(oldUrl)
  Object.entries(params).forEach(([prop, value]) => url.searchParams.set(prop, `${value}`))
  return url.toString()
}

export function normalizeUrl(path: string = '', { params = {} }: RequestParams = {}): string {
  const normalized = path.replace(/([^:]\/)\/+/g, '$1')
  const url = setUrlParams(normalized, params)
  return url || ''
}
