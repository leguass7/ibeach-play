import { ClientAxios } from '@/services/ClientAxios/client-axios'

export const apiService = new ClientAxios({ baseURL: '/api' })
