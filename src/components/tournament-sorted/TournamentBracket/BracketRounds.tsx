import type { IBracketMatch, IBracketRound } from '@/services/api/tournament/bracket/bracket.interface'
import type { IPair } from '@/services/api/tournament/pair/pair.interface'
import { StarIcon } from '@chakra-ui/icons'
import { Box, Text, Button, Badge, useColorModeValue, VStack } from '@chakra-ui/react'

interface BracketRoundsProps {
  rounds: IBracketRound[]
  openScoreDialog: (roundIndex: number, matchIndex: number, match: IBracketMatch) => void
}

export default function BracketRounds({ rounds, openScoreDialog }: BracketRoundsProps) {
  const winnerBgColor = useColorModeValue('green.50', 'green.900')
  const defaultBgColor = useColorModeValue('white', 'gray.800')
  const winnerBorderColor = useColorModeValue('green.300', 'green.300')
  const defaultBorderColor = useColorModeValue('gray.300', 'gray.700')

  const renderTeam = (pair: IPair | null, isWinner = false) => {
    const bgColor = isWinner ? winnerBgColor : defaultBgColor
    const borderColor = isWinner ? winnerBorderColor : defaultBorderColor

    if (!pair) return <Text color="gray.500">Aguardando...</Text>
    if (pair?.isBye)
      return (
        <Text color="gray.500" fontStyle="italic">
          BYE
        </Text>
      )

    return (
      <Box p={2} borderRadius="md" borderWidth={1} borderColor={borderColor} bg={bgColor}>
        <Box display="flex" alignItems="center">
          {pair?.hasSeeded && <StarIcon color="yellow.400" mr={1} fontSize="16px" />}
          <Text fontSize="sm" fontWeight={isWinner ? 'bold' : 'normal'}>
            {pair?.person1?.name} / {pair?.person2?.name}
          </Text>
          <Badge ml="auto" fontSize="0.7rem" colorScheme="blue">
            Peso: {pair?.totalWeight}
          </Badge>
        </Box>
      </Box>
    )
  }

  return (
    <Box overflowX="auto" pb={4}>
      <Box display="flex" gap={4} p={4} minWidth="max-content">
        {rounds?.map((round, roundIndex) => (
          <VStack key={round?.name} spacing={4}>
            <Text fontSize="md" fontWeight="medium" align="center">
              {round?.name}
            </Text>
            {round?.matches.map((match: IBracketMatch, matchIndex: number) => (
              <Box key={match?.id} width={250}>
                <VStack spacing={2}>
                  <Box>{renderTeam(match?.team1, match?.winner === match?.team1)}</Box>
                  <Box>{renderTeam(match?.team2, match?.winner === match?.team2)}</Box>
                  {match?.team1 && match?.team2 && !match?.winner && (
                    <Button variant="outline" size="sm" onClick={() => openScoreDialog(roundIndex, matchIndex, match)}>
                      Placar
                    </Button>
                  )}
                </VStack>
              </Box>
            ))}
          </VStack>
        ))}
      </Box>
    </Box>
  )
}
