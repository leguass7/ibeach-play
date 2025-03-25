import type { ResponseApi } from '@/services/ClientAxios'

import type { EnrollmentDTO } from '~/use-cases/enrollment'

export type EnrollmentOptionDto = Pick<EnrollmentDTO, 'id' | 'name'>

export type IEnrollmentResponse = ResponseApi<{ enrollment: EnrollmentDTO; arenaId: number; enrollments: EnrollmentDTO[] }>
