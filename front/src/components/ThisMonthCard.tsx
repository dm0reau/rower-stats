import {
  Card,
  CardContent,
  CircularProgress,
  makeStyles,
  Typography,
} from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'
import thisMonthWorkoutsUrl from '../api/this-month-workouts-url'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const ThisMonthCard = () => {
  const styles = useStyles()
  const { data: monthWorkouts } = useSwr<Workout[]>(
    thisMonthWorkoutsUrl(),
    apiFetcher,
  )

  return (
    <Card>
      <CardContent>
        {monthWorkouts ? (
          <>
            <Typography className={styles.title} color="textSecondary">
              Ce mois-ci
            </Typography>
            <Typography>
              <strong>{monthWorkouts.length}</strong>
              &nbsp;séances
            </Typography>
            <Typography>
              <strong>
                {monthWorkouts.reduce<number>(
                  (sum, workout) => sum + workout.kcal,
                  0,
                )}
              </strong>
              &nbsp;calories brulées
            </Typography>
            <Typography>
              <strong>
                {monthWorkouts.reduce<number>(
                  (sum, workout) => sum + workout.distance,
                  0,
                )}
              </strong>
              &nbsp;kilomètres parcourus
            </Typography>
            <Typography></Typography>
          </>
        ) : (
          <CircularProgress />
        )}
      </CardContent>
    </Card>
  )
}

export default ThisMonthCard
