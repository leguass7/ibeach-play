import prisma from '~/database'

import { TournamentStageRepository } from './tournament-stage.repository'
const tournamentStageRepository = new TournamentStageRepository(prisma)

export * from './tournament-stage.dto'
export { tournamentStageRepository }
