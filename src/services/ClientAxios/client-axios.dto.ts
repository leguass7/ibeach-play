export type ClientOptions = {
  baseURL: string
  debug?: boolean
  development?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResponseApi<Payload = Record<string, any>> = Payload & {
  success: boolean
  message?: string
}

export type Authorization = {
  accessToken: string
  refreshToken: string
  expiresIn?: number
}

export type ApiGrantType = 'client_credentials' | 'refresh_token'

export type RequestAuthorization = {
  clientId?: string
  username: string
  password: string
  grantType: ApiGrantType
}

export type RequestRefreshToken = Pick<RequestAuthorization, 'clientId' | 'grantType'>
