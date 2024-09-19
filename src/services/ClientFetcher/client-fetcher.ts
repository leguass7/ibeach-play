import type { AnyObject } from '@/@types/custom'
import type { Fetcher } from 'swr'

import type { ResponseApi } from '@services/ClientAxios'

import { normalizeUrl } from './client-fetcher.helper'
import type { ClientFetcherOptions, METHOD, RequestParams } from './client.fetcher.dto'

export class ClientFetcher {
  constructor(private readonly options: ClientFetcherOptions) {}

  async fetcher<R = ResponseApi>(method: METHOD, url: string, data?: AnyObject): Promise<R> {
    try {
      const response = await fetch(`${this.options.baseURL}${url}`, {
        body: data ? JSON.stringify(data) : undefined,
        method,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      }).then(res => res.json())
      return response as R
    } catch {
      return { success: false, message: 'timeout' } as R
    }
  }

  getFetcher<R = ResponseApi>(): Fetcher<R> {
    return async (url: string) => {
      return this.fetcher<R>('GET', url)
    }
  }

  async get(url: string, { params }: RequestParams = {}) {
    return this.fetcher('GET', normalizeUrl(url, params))
  }

  async patch(url: string, data: AnyObject, { params }: RequestParams = {}) {
    return this.fetcher('PATCH', normalizeUrl(url, params), data)
  }

  async post(url: string, data: AnyObject, { params }: RequestParams = {}) {
    return this.fetcher('POST', normalizeUrl(url, params), data)
  }

  async delete(url: string, { params }: RequestParams = {}) {
    return this.fetcher('DELETE', normalizeUrl(url, params))
  }
}
