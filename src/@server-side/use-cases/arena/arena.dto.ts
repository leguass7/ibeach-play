import { IsInt, IsOptional, Length } from 'class-validator'

export class ArenaDTO {
  id: number
  name: string
  description?: string
  userId: number
  cityId: number
  createdBy: number
  createdAt: Date
  updatedBy?: number | null
  updatedAt?: Date | null
}

export class CreateArenaDTO {
  @Length(3, 255)
  name: string

  @Length(0, 1048)
  @IsOptional()
  description?: string

  @IsInt()
  userId: number

  @IsInt()
  cityId: number

  @IsOptional()
  createdBy: number

  @IsOptional()
  createdAt: Date
}
