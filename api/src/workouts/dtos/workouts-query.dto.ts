import { Type } from 'class-transformer'
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator'

export class WorkoutsQuery {
  @IsOptional()
  @IsDateString()
  beginDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  limit?: number
}
