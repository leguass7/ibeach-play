import { IsInt, IsOptional, IsUUID } from 'class-validator'

export class TeamDTO {
  id: string
  stageId?: number
  playerAId: string
  playerBId: string
  groupId?: string
  createdAt?: Date
  updatedBy?: number | null
  updatedAt?: Date | null
}

export class CreateTeamDTO {
  @IsInt()
  stageId: number

  @IsUUID()
  playerAId: string

  @IsUUID()
  playerBId: string

  @IsOptional()
  @IsUUID()
  groupId?: string

  @IsOptional()
  createdAt?: Date
}

export class UpdateTeamDTO {
  @IsOptional()
  @IsInt()
  stageId?: number

  @IsOptional()
  @IsUUID()
  playerAId?: string

  @IsOptional()
  @IsUUID()
  playerBId?: string

  @IsOptional()
  @IsUUID()
  groupId?: string
}
