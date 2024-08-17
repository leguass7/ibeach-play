export type ClientFetcherOptions = {
  baseURL: string
}

export type RequestParams = {
  params?: Record<string, unknown>
  body?: Record<string, unknown>
}

export type METHOD = 'POST' | 'GET' | 'PATCH' | 'DELETE'
