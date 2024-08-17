import { ClientFetcher } from '@/services/ClientFetcher/client-fetcher'

export const apiService = new ClientFetcher({ baseURL: '/api' })
