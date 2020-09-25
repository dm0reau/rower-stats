import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Program } from './program.enum'

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unsigned: true })
  time: number

  @Column('float', { unsigned: true })
  distance: number

  @Column({ unsigned: true })
  kcal: number

  @Column({ unsigned: true })
  resistance: number

  @Column({ type: 'enum', enum: Program })
  program: Program

  @Column()
  date: Date
}
