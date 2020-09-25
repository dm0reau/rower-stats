import { WorkoutProgram } from '../api/interfaces/workout-program'

export interface WorkoutFields {
  spm: string
  time: string
  distance: string
  kcal: string
  date: string
  resistance: string
  program: WorkoutProgram
}
