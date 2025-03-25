import prisma from '~/database'

import { TournamentRepository } from './tournament.repository'
const tournamentRepository = new TournamentRepository(prisma)

export { tournamentRepository }
