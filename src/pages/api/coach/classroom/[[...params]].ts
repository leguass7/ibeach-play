/* eslint-disable @typescript-eslint/consistent-type-imports */
import { AuthJwtGuard } from '@/@server-side/use-cases/auth/auth-jwt.guard'
import type { AuthorizedApiRequest } from '@/@server-side/use-cases/auth/auth.interface'
import { classroomService } from '@/@server-side/use-cases/classroom'
import { CreateClassroomDTO, UpdateClassroomDTO } from '@/@server-side/use-cases/classroom'
import { Body, createHandler, Get, HttpCode, Post, Param, Req, ValidationPipe, Patch } from 'next-api-decorators'

@AuthJwtGuard()
class CoachClassroomHandler {
  @HttpCode(200)
  @Get('/')
  async list(@Req() req: AuthorizedApiRequest) {
    const coachId = req.auth?.userId
    if (!coachId) throw new Error('Unauthorized')

    const arenaId = req.query.arenaId ? Number(req.query.arenaId) : undefined
    const classrooms = await classroomService.listClassrooms(coachId, arenaId)

    return { success: true, classrooms }
  }

  @HttpCode(201)
  @Post('/')
  async create(
    @Body(ValidationPipe({ transformOptions: { enableImplicitConversion: true } }))
    body: CreateClassroomDTO,
    @Req() req: AuthorizedApiRequest
  ) {
    const coachId = req.auth?.userId
    if (!coachId) throw new Error('Unauthorized')

    const data = { ...body, coachId }
    const classroom = await classroomService.createClassroom(data)

    return { success: true, classroom }
  }

  @HttpCode(200)
  @Patch('/:id')
  async update(@Param('id') id: number, @Body(ValidationPipe) body: UpdateClassroomDTO, @Req() req: AuthorizedApiRequest) {
    const coachId = req.auth?.userId
    if (!coachId) throw new Error('Unauthorized')

    const classroom = await classroomService.updateClassroom(Number(id), body)

    return { success: true, classroom }
  }
}

export default createHandler(CoachClassroomHandler)
