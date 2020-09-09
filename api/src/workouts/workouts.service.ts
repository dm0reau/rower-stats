import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Workout } from './workout.entity'

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutsRepo: Repository<Workout>,
  ) {}

  async create(workout: Workout): Promise<Workout> {
    return this.workoutsRepo.save(workout)
  }

  async findAll(): Promise<Workout[]> {
    return this.workoutsRepo.find()
  }

  async findOne(id: number): Promise<Workout> {
    return this.workoutsRepo.findOne(id)
  }

  async count(): Promise<number> {
    return this.workoutsRepo.count()
  }

  async getCountForMonth(year: number, month: number): Promise<number> {
    const result = await this.workoutsRepo
      .createQueryBuilder()
      .select('COUNT(id) AS count')
      .where('date >= :beginDate AND date <= :endDate', {
        beginDate: new Date(),
        endDate: new Date(),
      })
      .getRawOne()
    return result.count
  }

  async getKcalSumForMonth(year: number, month: number): Promise<number> {
    const result = await this.workoutsRepo
      .createQueryBuilder()
      .select('SUM(kcal) AS sum')
      .where('date >= :beginDate AND date <= :endDate', {
        beginDate: new Date(),
        endDate: new Date(),
      })
      .getRawOne()
    return result.sum
  }

  async delete(id: number): Promise<void> {
    await this.workoutsRepo.delete(id)
  }
}
