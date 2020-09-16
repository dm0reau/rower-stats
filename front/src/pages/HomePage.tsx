import { CircularProgress } from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'
import AddFab from '../components/AddFab'
import DashboardLayout from '../components/DashboardLayout'
import WorkoutsTable from '../components/WorkoutsTable'

const HomePage: React.FC = () => {
  const { data: lastWorkout } = useSwr<Workout>('workouts/last', apiFetcher)

  return (
    <DashboardLayout>
      <AddFab />
      {lastWorkout ? (
        <WorkoutsTable workouts={[lastWorkout]} />
      ) : (
        <CircularProgress />
      )}
    </DashboardLayout>
  )
}

export default HomePage
