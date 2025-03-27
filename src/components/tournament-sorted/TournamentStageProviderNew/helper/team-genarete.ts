import type { EnrollmentDTO } from '~/use-cases/enrollment'
import { type TeamDTO } from '~/use-cases/team'

// Função para balancear as duplas com base no peso
export function generateBalancedTeams(enrollments: EnrollmentDTO[], stageId?: number): TeamDTO[] {
  if (enrollments?.length < 2) return []

  const sorted = [...enrollments]?.sort((a, b) => (a?.weight || 0) - (b?.weight || 0))
  const teams: TeamDTO[] = []
  const usedPlayers = new Set<string>()

  while (sorted.length > 1) {
    const lightest = sorted.shift()!
    const closestIndex = sorted.findIndex(e => !usedPlayers?.has(e?.id))
    if (closestIndex === -1) break

    const partner = sorted.splice(closestIndex, 1)[0]
    usedPlayers.add(lightest?.id)
    usedPlayers.add(partner?.id)

    teams.push({
      id: crypto?.randomUUID(),
      stageId: stageId || lightest.stageId!,
      playerAId: lightest.id,
      playerBId: partner.id,
      createdAt: new Date()
    })
  }

  return teams
}

// Função para gerar duplas aleatoriamente
export function generateRandomTeams(enrollments: EnrollmentDTO[], stageId?: number): TeamDTO[] {
  if (enrollments?.length < 2) return []

  const shuffled = [...enrollments]?.sort(() => Math.random() - 0.5)
  const teams: TeamDTO[] = []
  const usedPlayers = new Set<string>()

  for (let i = 0; i < shuffled.length - 1; i += 2) {
    if (!usedPlayers.has(shuffled[i].id) && !usedPlayers?.has(shuffled[i + 1].id)) {
      teams.push({
        id: crypto.randomUUID(),
        stageId: stageId || shuffled[i].stageId!,
        playerAId: shuffled[i].id,
        playerBId: shuffled[i + 1].id,
        createdAt: new Date()
      })
      usedPlayers.add(shuffled[i].id)
      usedPlayers.add(shuffled[i + 1].id)
    }
  }

  return teams
}

// Função para criar uma dupla manualmente
export function createManualTeam(enrollments: EnrollmentDTO[], playerAId: string, playerBId: string, stageId?: number): TeamDTO | null {
  const playerA = enrollments.find(e => e?.id === playerAId)
  const playerB = enrollments.find(e => e?.id === playerBId)

  if (!playerA || !playerB) return null
  if (playerAId === playerBId) return null

  const existingTeams = new Set([...enrollments.map(e => e.id)])
  if (existingTeams.has(playerAId) || existingTeams.has(playerBId)) return null

  return {
    id: crypto.randomUUID(),
    stageId: stageId || playerA.stageId!,
    playerAId,
    playerBId,
    createdAt: new Date()
  }
}
