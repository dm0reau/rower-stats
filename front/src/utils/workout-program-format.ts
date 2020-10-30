import { WorkoutProgram } from '../api/interfaces/workout-program'

export function getReadableWorkoutProgram(
  workoutProgram: WorkoutProgram,
): string {
  switch (workoutProgram) {
    case 'fitness1':
      return 'Fitness 1'
    case 'fitness2':
      return 'Fitness 2'
    case 'fitness3':
      return 'Fitness 3'
    case 'kcal1':
      return 'Kcal 1'
    case 'kcal2':
      return 'Kcal 2'
    default:
      throw new Error(`Incorrect workout program : ${workoutProgram}`)
  }
}
