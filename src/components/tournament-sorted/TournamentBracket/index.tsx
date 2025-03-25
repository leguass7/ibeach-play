'use client'

import type React from 'react'
import { useState, useEffect } from 'react'

import { useOnceCall } from '@/hooks/useOnceCall'
import type { IBracketMatch } from '@/services/api/tournament/bracket/bracket.interface'
import { Box, Spinner, Text, Alert, AlertIcon, VStack } from '@chakra-ui/react'

import { useTournamentStageProvider } from '../TournamentStageProvider'
import BracketControls from './BracketControls'
import BracketRounds from './BracketRounds'
import ScoreDialog from './ScoreDialog'

interface TournamentBracketProps {
  onSuccess: () => void
}

export default function TournamentBracket({ onSuccess }: TournamentBracketProps) {
  const { pairs, bracketRounds, fetchPairs, fetchBracketRounds, generateBracket, updateMatchScore, loading } = useTournamentStageProvider()

  const [bracketSize, setBracketSize] = useState<number>(4)
  const [error, setError] = useState<string | null>(null)
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false)
  const [currentMatch, setCurrentMatch] = useState<{
    roundIndex: number
    matchIndex: number
    match: IBracketMatch
  } | null>(null)
  const [scores, setScores] = useState({ score1: 0, score2: 0 })

  useOnceCall(fetchPairs)
  useOnceCall(fetchBracketRounds)

  useEffect(() => {
    if (pairs?.length > 0) {
      const nearestPowerOf2 = Math.pow(2, Math.ceil(Math?.log2(pairs.length)))
      setBracketSize(nearestPowerOf2)
    }
  }, [pairs])

  const handleGenerateBracket = async () => {
    setError(null)
    try {
      await generateBracket(bracketSize)
      onSuccess()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro ao gerar chaves.')
    }
  }

  const openScoreDialog = (roundIndex: number, matchIndex: number, match: IBracketMatch) => {
    setCurrentMatch({ roundIndex, matchIndex, match })
    setScores({ score1: match.score1 || 0, score2: match.score2 || 0 })
    setScoreDialogOpen(true)
  }

  const handleSaveScore = async () => {
    if (!currentMatch) return
    try {
      await updateMatchScore(currentMatch.roundIndex, currentMatch.matchIndex, scores.score1, scores.score2)
      setScoreDialogOpen(false)
      onSuccess()
    } catch (error) {
      console.error('Error updating score:', error)
    }
  }

  return (
    <VStack spacing={4} align="stretch">
      <BracketControls
        bracketSize={bracketSize}
        setBracketSize={setBracketSize}
        handleGenerateBracket={handleGenerateBracket}
        loading={loading.brackets}
      />

      {error && (
        <Alert status="error" mb={3}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      {loading.brackets ? (
        <Box display="flex" justifyContent="center" py={5}>
          <Spinner />
        </Box>
      ) : bracketRounds.length > 0 ? (
        <BracketRounds rounds={bracketRounds} openScoreDialog={openScoreDialog} />
      ) : (
        <Box textAlign="center" py={5}>
          <Text color="gray.500">{"Clique em 'Gerar Chaves' para criar as chaves do torneio."}</Text>
        </Box>
      )}

      <ScoreDialog
        open={scoreDialogOpen}
        onClose={() => setScoreDialogOpen(false)}
        match={currentMatch}
        scores={scores}
        setScores={setScores}
        onSave={handleSaveScore}
        loading={loading.brackets}
      />
    </VStack>
  )
}
