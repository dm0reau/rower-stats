import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateWorkout } from './dtos/create-workout.dto'
import { UpdateWorkout } from './dtos/update-workout.dto'
import { WorkoutsQuery } from './dtos/workouts-query.dto'
import { Workout } from './workout.entity'
import { WorkoutsService } from './workouts.service'

@UseGuards(AuthGuard('jwt'))
@Controller('workouts')
export class WorkoutsController {
  private static ELEMENTS_PER_PAGE_DEFAULT = 10

  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  async getWorkouts(@Query() query: WorkoutsQuery): Promise<Workout[]> {
    return await this.workoutsService.findAll(query)
  }

  @Get('last')
  async getLastWorkout(): Promise<Workout> {
    const workout = await this.workoutsService.findLast()
    if (!workout) {
      throw new NotFoundException("There's no workouts")
    }
    return workout
  }

  @Get(':id')
  async getWorkout(
    @Param('id', new ParseIntPipe()) workoutId: number,
  ): Promise<Workout> {
    const workout = await this.workoutsService.findOne(workoutId)
    if (!workout) {
      throw new NotFoundException(`Workout with id ${workoutId} not found`)
    }
    return workout
  }

  @Post()
  async createWorkout(@Body() workoutBody: CreateWorkout): Promise<Workout> {
    const workout = new Workout()
    Object.assign(workout, workoutBody)
    workout.date = workoutBody.date ? workoutBody.date : new Date()
    return await this.workoutsService.create(workout)
  }

  @Put(':id')
  async updateWorkout(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() workoutBody: UpdateWorkout,
  ): Promise<Workout> {
    if (Object.keys(workoutBody).length === 0) {
      throw new BadRequestException('JSON body cannot be empty')
    }
    const workoutToUpdate = await this.workoutsService.findOne(id)
    if (!workoutToUpdate) {
      throw new NotFoundException(this.getWorkoutNotFoundMessage(id.toString()))
    }
    await this.workoutsService.update(id, workoutBody)
    return this.workoutsService.findOne(id)
  }

  @Delete(':id')
  async deleteWorkout(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Workout> {
    const workoutToDelete = await this.workoutsService.findOne(id)
    if (!workoutToDelete) {
      throw new NotFoundException(this.getWorkoutNotFoundMessage(id.toString()))
    }
    await this.workoutsService.delete(id)
    return workoutToDelete
  }

  private getWorkoutNotFoundMessage(id: string): string {
    return `Workout with id ${id} doesn't exists`
  }
}
