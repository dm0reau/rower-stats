import { WorkoutProgram } from './workout-program'

export interface Workout {
  id?: number
  time: number
  distance: number
  kcal: number
  resistance: number
  program: WorkoutProgram
  date: string
}
