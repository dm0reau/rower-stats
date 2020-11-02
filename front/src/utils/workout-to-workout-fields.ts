import { Workout } from '../api/interfaces/workout'
import { WorkoutFields } from '../interfaces/workout-fields'
import { getFormattedDate } from './date-format'

export default function workoutToWorkoutFields(
  workout: Workout,
): WorkoutFields {
  return {
    date: getFormattedDate(new Date(workout.date)),
    distance: workout.distance.toString(),
    kcal: workout.kcal.toString(),
    program: workout.program,
    resistance: workout.resistance.toString(),
    time: workout.time.toString(),
  }
}
