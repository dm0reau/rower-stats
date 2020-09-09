import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { CreateWorkout } from './create-workout.dto'
import { Workout } from './workout.entity'
import { WorkoutsService } from './workouts.service'

@UseGuards(AuthGuard('jwt'))
@Controller('workouts')
export class WorkoutsController {
  private static ELEMENTS_PER_PAGE_DEFAULT = 10

  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  async getWorkouts(): Promise<Workout[]> {
    return await this.workoutsService.findAll()
  }

  @Get('count')
  async getWorkoutsCount(): Promise<number> {
    return await this.workoutsService.count()
  }

  @Get('count/:year/:month')
  async getWorkoutsCountForMonth(
    @Param('year', new ParseIntPipe()) year: number,
    @Param('month', new ParseIntPipe()) month: number,
  ): Promise<number> {
    return await this.workoutsService.getCountForMonth(year, month)
  }

  @Get('kcal-sum/:year/:month')
  async getKcalSumForMonth(
    @Param('year', new ParseIntPipe()) year: number,
    @Param('month', new ParseIntPipe()) month: number,
  ): Promise<number> {
    return await this.workoutsService.getKcalSumForMonth(year, month)
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
