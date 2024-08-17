import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios'
import type { Fetcher } from 'swr'

import { Authorization, ClientOptions, ResponseApi } from './client-axios.dto'
import { normalizeToken } from './client-axios.helper'
import { MemoryStore } from './store/memory.store'
import { SetStoreParams, StoreInterface } from './store/store.interface'

export class ClientAxios {
  public axios: AxiosInstance
  private baseURL: string

  constructor(
    private readonly options: ClientOptions,
    private readonly store?: StoreInterface
  ) {
    this.baseURL = '/api'
    if (!store) this.store = new MemoryStore()
    this.axios = axios.create({ baseURL: this.baseURL, withCredentials: true })
    this.configure()
  }

  log(...str: (string | Record<string, unknown> | null | undefined)[]) {
    if (this.options?.debug) console.log('ClientFetcher', ...str)
  }

  private configure() {
    this.axios.interceptors.request.use(async req => {
      const accessToken = await this.getAccessToken()

      if (!!this.options?.development) req.headers['ngrok-skip-browser-warning'] = true
      if (accessToken) req.headers.Authorization = normalizeToken(accessToken)

      const params = req?.params ? JSON.stringify(req?.params) : ''
      const url = `${req?.baseURL}${req?.url} ${params}`
      this.log('REQUEST:', req?.method, url, '\n', req?.data)
      return req
    })

    this.axios.interceptors.response.use(
      axiosResponse => {
        const success = !!(axiosResponse?.status < 400)
        axiosResponse.data.success = success
        const url = `${axiosResponse?.config?.baseURL}${axiosResponse?.config?.url || ''}`
        const prefix = `RESPONSE: ${axiosResponse?.status}`
        this.log(prefix, '\n', url, '\n', JSON.stringify(axiosResponse?.data || {}, null, 2), '\n')
        return axiosResponse
      },
      async (axiosError: AxiosError) => {
        const config = axiosError?.config
        const status = axiosError?.response?.status
        const data = (axiosError?.response?.data || {}) as ResponseApi
        const message = data?.message || 'timeout'

        const resolve: ResponseApi = { ...data, success: false, message }

        if (config && axiosError?.response) {
          if (status === 401 /* && message === "token_expired" */) {
            // const accessToken = await this.refreshToken(config)
            // if (accessToken) {
            //   config.headers.Authorization = normalizeToken(accessToken)
            //   try {
            //     return axios(config)
            //   } catch {
            this.clearStore()
            // }
            // }
          }

          return Promise.resolve(resolve)
        }

        return Promise.resolve(resolve)
      }
    )
  }

  private async getAccessToken(): Promise<string | null> {
    const accessToken = (await this?.store?.get?.())?.accessToken || null
    console.log('accessToken', accessToken)
    return accessToken
  }

  getFetcher<R = unknown>(): Fetcher<R> {
    return async (url: string) => {
      const response = await this.axios.get(url)
      return response?.data
    }
  }

  public async getStore(): Promise<Authorization | null> {
    return (await this?.store?.get?.()) || null
  }

  public async setStore(params: SetStoreParams): Promise<void> {
    await this?.store?.set?.(params)
  }

  public async clearStore(): Promise<void> {
    await this?.store?.clear?.()
  }

  async get<R = ResponseApi>(url: string, config: AxiosRequestConfig = {}): Promise<R | null> {
    const response = await this.axios.get(url, config)
    return response?.data || null
  }

  async patch<R = ResponseApi>(url: string, data: AnyObject, config: AxiosRequestConfig = {}): Promise<R | null> {
    const response = await this.axios.patch(url, data, config)
    return response?.data || null
  }

  async post<R = ResponseApi>(url: string, data: AnyObject, config: AxiosRequestConfig = {}): Promise<R | null> {
    const response = await this.axios.post(url, data, config)
    return response?.data || null
  }

  async delete<R = ResponseApi>(url: string, config: AxiosRequestConfig = {}): Promise<R | null> {
    const response = await this.axios.delete(url, config)
    return response?.data || null
  }
}
