import { WorkoutProgram } from '../api/interfaces/workout-program';

export interface WorkoutFields {
  time: string
  distance: string
  kcal: string
  date: string
  resistance: string
  program: WorkoutProgram
}
