import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { WorkoutsQuery } from './dtos/workouts-query.dto'
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

  async findAll(query: WorkoutsQuery): Promise<Workout[]> {
    const queryBuilder = this.workoutsRepo.createQueryBuilder()
    if (query.beginDate && query.endDate) {
      queryBuilder
        .where('date >= :beginDate', { beginDate: query.beginDate })
        .andWhere('date <= :endDate', { endDate: query.endDate })
    }
    return queryBuilder.orderBy('date', 'DESC').getMany()
  }

  async findOne(id: number): Promise<Workout> {
    return this.workoutsRepo.findOne(id)
  }

  async findLast(): Promise<Workout> {
    return this.workoutsRepo.findOne({ order: { date: 'DESC' } })
  }

  async delete(id: number): Promise<void> {
    await this.workoutsRepo.delete(id)
  }
}
