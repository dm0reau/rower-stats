import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'
import thisMonthWorkoutsUrl from '../api/this-month-workouts-url'
import AddFab from '../components/AddFab'
import DashboardLayout from '../components/DashboardLayout'
import LastWorkoutCard from '../components/LastWorkoutCard'
import ThisMonthCard from '../components/ThisMonthCard'

const HomePage: React.FC = () => {
  const { data: lastWorkout } = useSwr<Workout>('workouts/last', apiFetcher)
  const { data: monthWorkouts } = useSwr<Workout[]>(
    thisMonthWorkoutsUrl(),
    apiFetcher,
  )

  return (
    <DashboardLayout>
      <AddFab />
      {lastWorkout ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <LastWorkoutCard workout={lastWorkout} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ThisMonthCard monthWorkouts={monthWorkouts || []} />
          </Grid>
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </DashboardLayout>
  )
}

export default HomePage
