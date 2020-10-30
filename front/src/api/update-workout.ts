import { WorkoutFields } from '../interfaces/workout-fields'
import apiClient from './client'

export default async function apiUpdateWorkout(
  workout: WorkoutFields,
  workoutId: number,
) {
  return apiClient.put(`/workouts/${workoutId}`, workout)
}
