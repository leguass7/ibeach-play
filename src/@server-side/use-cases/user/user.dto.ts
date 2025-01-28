import type { ShirtSize, UserGender, User } from '@prisma/client'
import { Exclude } from 'class-transformer'
import { IsNotEmpty, IsEmail, IsOptional, IsDate } from 'class-validator'

export type UserDTO = Partial<User>

export class UserResponseDTO {
  id: number
  email: string
  @Exclude()
  password: string | null
  nick: string | null
  name: string | null
  cpf: string | null
  birday: Date | null
  gender: UserGender | null
  phone: string | null
  image: string | null
  cityId: number | null
  @IsDate()
  emailVerified: Date | null
  shirtSize: ShirtSize | null

  @IsDate()
  createdAt: Date
  @IsDate()
  updatedAt: Date | null
  @IsDate()
  lastAccess: Date | null
}

export class CreateUserDTO {
  @IsEmail()
  email: string

  @IsNotEmpty()
  name!: string

  @Exclude()
  password: string
}

export class UpdateUserDTO {
  @IsEmail()
  @IsOptional()
  email: string

  @IsNotEmpty()
  @IsOptional()
  name: string
}
