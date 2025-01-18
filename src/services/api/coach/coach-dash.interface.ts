import type { ResponseApi } from '@/services/ClientAxios'

export type IResponseCoachDash = ResponseApi<{ classroomCount: number; studentCount: number }>
