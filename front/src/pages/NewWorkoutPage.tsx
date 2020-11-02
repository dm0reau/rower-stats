import React from 'react'
import { useHistory } from 'react-router'
import { Workout } from '../api/interfaces/workout'
import apiAddWorkout from '../api/workouts/add'
import WorkoutForm from '../components/WorkoutForm'
import { WorkoutFields } from '../interfaces/workout-fields'

const NewWorkoutPage: React.FC = () => {
  const history = useHistory()

  const onSubmit = async (workoutFields: WorkoutFields) => {
    const newWorkout: Workout = {
      distance: +workoutFields.distance,
      kcal: +workoutFields.kcal,
      resistance: +workoutFields.resistance,
      time: +workoutFields.time,
      program: workoutFields.program,
      date: workoutFields.date,
    }
    await apiAddWorkout(newWorkout)
    history.push('/workouts')
  }

  return <WorkoutForm onSubmit={onSubmit} />
}

export default NewWorkoutPage
