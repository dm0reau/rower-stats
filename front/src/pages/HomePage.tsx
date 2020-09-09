import { CircularProgress } from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'
import DashboardLayout from '../components/DashboardLayout'
import WorkoutsTable from '../components/WorkoutsTable'

const HomePage: React.FC = () => {
  const { data } = useSwr<Workout[]>('workouts', apiFetcher)

  return (
    <DashboardLayout>
      {data ? <WorkoutsTable workouts={data} /> : <CircularProgress />}
    </DashboardLayout>
  )
}

export default HomePage
