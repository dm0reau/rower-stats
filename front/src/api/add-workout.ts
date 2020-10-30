import apiClient from './client'
import { Workout } from './interfaces/workout'

export default async function apiAddWorkout(workout: Workout) {
  return apiClient.post('/workouts', workout)
}
