import apiClient from './client'

export default async function apiDeleteWorkout(workoutId: number) {
  return apiClient.delete(`/workouts/${workoutId}`)
}
