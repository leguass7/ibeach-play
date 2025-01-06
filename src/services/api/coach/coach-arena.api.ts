import { apiService } from '@/services/api/api.service'
import type { IResponseArenaOptions } from '@/services/api/arena/arena.dto'

export function coachGetArenaOptions(): Promise<IResponseArenaOptions | null> {
  return apiService.get(`/coach/arena/options`)
}
