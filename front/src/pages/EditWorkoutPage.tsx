import { CircularProgress } from '@material-ui/core'
import React from 'react'
import { useHistory, useParams } from 'react-router'
import useSWR, { mutate } from 'swr'
import { Workout } from '../api/interfaces/workout'
import apiUpdateWorkout from '../api/workouts/update'
import WorkoutForm from '../components/WorkoutForm'
import { WorkoutFields } from '../interfaces/workout-fields'
import workoutToWorkoutFields from '../utils/workout-to-workout-fields'

interface Params {
  workoutId: string
}

const EditWorkoutPage: React.FC = () => {
  const history = useHistory()
  const { workoutId } = useParams<Params>()
  const workoutRequest = `/workouts/${workoutId}`
  const { data: workout } = useSWR<Workout>(workoutRequest)

  if (isNaN(+workoutId)) {
    throw new Error(`workoutId must be a valid number. Given ${workoutId}.`)
  }

  const onSubmit = async (workoutFields: WorkoutFields) => {
    const updatedWorkout: Workout = {
      distance: +workoutFields.distance,
      kcal: +workoutFields.kcal,
      resistance: +workoutFields.resistance,
      time: +workoutFields.time,
      program: workoutFields.program,
      date: workoutFields.date,
    }
    await apiUpdateWorkout(updatedWorkout, +workoutId)
    await mutate(workoutRequest, updatedWorkout)
    history.push('/workouts')
  }

  return workout ? (
    <WorkoutForm
      defaultValues={workoutToWorkoutFields(workout)}
      onSubmit={onSubmit}
    />
  ) : (
    <CircularProgress />
  )
}

export default EditWorkoutPage
