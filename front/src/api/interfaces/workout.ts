import { WorkoutProgram } from './workout-program'

export interface Workout {
  id: number
  strokes: number
  time: number
  distance: number
  kcal: number
  resistance: number
  program: WorkoutProgram
  date: Date
}
