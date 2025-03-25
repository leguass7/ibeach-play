import type { ResponseApi } from '@/services/ClientAxios'

export type IResponseAdminDash = ResponseApi<{ arenaCount: number; tournamentCount: number; userCount: number }>
