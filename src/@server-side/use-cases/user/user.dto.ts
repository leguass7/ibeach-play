import { Prisma, type User } from '@prisma/client'
import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

export type UserDTO = Partial<User>

export class CreateUserDTO {
  @IsEmail()
  email: string

  @IsNotEmpty()
  name!: string
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string

  @IsNotEmpty()
  @IsOptional()
  name: string
}
