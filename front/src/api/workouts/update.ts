import apiClient from '../client'
import { Workout } from '../interfaces/workout'

export default async function apiUpdateWorkout(
  workout: Omit<Workout, 'id'>,
  workoutId: number,
) {
  return apiClient.put(`/workouts/${workoutId}`, workout)
}
