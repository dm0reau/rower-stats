import { CircularProgress } from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'
import AddFab from '../components/AddFab'
import DashboardLayout from '../components/DashboardLayout'
import LastWorkoutCard from '../components/LastWorkoutCard'

const HomePage: React.FC = () => {
  const { data: lastWorkout } = useSwr<Workout>('workouts/last', apiFetcher)

  return (
    <DashboardLayout>
      <AddFab />
      {lastWorkout ? (
        <LastWorkoutCard workout={lastWorkout} />
      ) : (
        <CircularProgress />
      )}
    </DashboardLayout>
  )
}

export default HomePage
