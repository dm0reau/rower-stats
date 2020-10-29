import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNumber, IsOptional } from 'class-validator'
import { Program } from '../program.enum'

export class UpdateWorkout {
  @IsOptional()
  @IsNumber()
  time?: number

  @IsOptional()
  @IsNumber()
  distance?: number

  @IsOptional()
  @IsNumber()
  kcal?: number

  @IsOptional()
  @IsNumber()
  resistance?: number

  @IsOptional()
  @IsEnum(Program)
  program?: Program

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date?: Date
}
