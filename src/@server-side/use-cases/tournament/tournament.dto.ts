import { Type } from 'class-transformer'
import { IsDateString, IsInt, IsOptional, IsString, Length } from 'class-validator'

export class TournamentDTO {
  id: string
  name: string
  description?: string
  startDate: Date
  endDate: Date
  createdBy: number
  createdAt: Date
  updatedBy?: number
  updatedAt: Date
}

export class CreateTournamentDTO {
  @IsString()
  @Length(3, 255)
  name: string

  @IsOptional()
  @IsString()
  @Length(0, 1048)
  description?: string

  @IsDateString()
  @Type(() => Date)
  startDate: Date

  @IsDateString()
  @Type(() => Date)
  endDate: Date

  @IsOptional()
  @IsInt()
  createdBy: number
}

export class UpdateTournamentDTO {
  @IsOptional()
  @IsString()
  @Length(3, 255)
  name?: string

  @IsOptional()
  @IsString()
  @Length(0, 1048)
  description?: string

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  startDate?: Date

  @IsOptional()
  @IsDateString()
  @Type(() => Date)
  endDate?: Date

  @IsOptional()
  @IsInt()
  updatedBy?: number
}
