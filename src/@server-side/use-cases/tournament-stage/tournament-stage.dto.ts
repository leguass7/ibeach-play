import { Type } from 'class-transformer'
import { IsDateString, IsInt, IsOptional, IsString, Length } from 'class-validator'

export type StageStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

export class TournamentStageDTO {
  id: number
  tournamentId: number
  arenaId: number
  name: string
  date: Date
  status: StageStatus
  createdAt?: Date
  updatedAt?: Date
}

export class CreateTournamentStageDTO {
  @IsInt()
  tournamentId: number

  @IsInt()
  arenaId: number

  @IsString()
  @Length(3, 255)
  name: string

  @IsDateString()
  @Type(() => Date)
  date: Date

  @IsOptional()
  @IsInt()
  createdBy: number
}

export class UpdateTournamentStageDTO {
  @IsOptional()
  @IsInt()
  tournamentId: number

  @IsOptional()
  @IsInt()
  arenaId: number

  @IsOptional()
  @IsString()
  @Length(3, 255)
  name?: string

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  date: Date

  @IsOptional()
  @IsInt()
  updatedBy: number
}
