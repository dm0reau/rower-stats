import { Grid } from '@material-ui/core'
import React from 'react'
import AddFab from '../components/AddFab'
import DashboardLayout from '../components/DashboardLayout'
import LastWorkoutCard from '../components/LastWorkoutCard'
import ThisMonthCard from '../components/ThisMonthCard'
import WorkoutsTable from '../components/WorkoutsTable'

const HomePage: React.FC = () => {
  return (
    <DashboardLayout>
      <AddFab />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <LastWorkoutCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <ThisMonthCard />
        </Grid>
        <Grid item xs={12}>
          <WorkoutsTable />
        </Grid>
      </Grid>
    </DashboardLayout>
  )
}

export default HomePage
