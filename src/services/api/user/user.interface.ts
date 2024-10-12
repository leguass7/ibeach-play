import type { ResponseApi } from '@/services/ClientAxios'

export interface IUser {
  id: number
  name: string
  email: string
  role: 'admin' | 'user'
}

export type UserPaginateParams = {
  page?: number
  size?: number
}

export interface IUserResponse extends ResponseApi {
  users: IUser[]
}
