import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator'
import { Program } from './program.enum'

export class CreateWorkout {
  @IsNumber()
  strokes: number

  @IsNumber()
  time: number

  @IsNumber()
  distance: number

  @IsNumber()
  kcal: number

  @IsNumber()
  resistance: number

  @IsEnum(Program)
  program: Program

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date
}
