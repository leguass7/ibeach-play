import { IsInt, IsOptional, Length } from 'class-validator'

export class EnrollmentDTO {
  id: string
  name: string
  stageId?: number
  userId?: number
  createdAt?: Date
  updatedBy?: number | null
  updatedAt?: Date | null
}

export class CreateEnrollmentDTO {
  @IsOptional()
  @Length(3, 255)
  name: string

  @IsOptional()
  @IsInt()
  stageId: number

  @IsOptional()
  @IsInt()
  userId?: number

  @IsOptional()
  @IsInt()
  weight?: number

  @IsOptional()
  createdAt?: Date
}

export class UpdateEnrollmentDTO {
  @IsOptional()
  @Length(3, 255)
  name?: string

  @IsOptional()
  @IsInt()
  stageId?: number

  @IsOptional()
  @IsInt()
  userId?: number

  @IsOptional()
  @IsInt()
  weight?: number
}
