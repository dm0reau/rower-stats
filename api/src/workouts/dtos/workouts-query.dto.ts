import { IsDateString, IsOptional } from 'class-validator'

export class WorkoutsQuery {
  @IsOptional()
  @IsDateString()
  beginDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string
}
