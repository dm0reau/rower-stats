import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { Workout } from '../api/interfaces/workout'

interface Props {
  monthWorkouts: Workout[]
}

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const ThisMonthCard = ({ monthWorkouts }: Props) => {
  const styles = useStyles()

  return (
    <Card>
      <CardContent>
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
      </CardContent>
    </Card>
  )
}

export default ThisMonthCard
