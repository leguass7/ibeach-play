import type { ArenaRepository } from './arena.repository'

export class ArenaService {
  constructor(private readonly arenaRepository: ArenaRepository) {}

  getReposytory() {
    return this.arenaRepository
  }

  async listOptions() {
    return this.arenaRepository.findAllOptions()
  }

  async search(text: string | null = '') {
    if (!text) return []
    //
    return []
  }
}
