import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { OpenInBrowser } from '@material-ui/icons'
import { lightFormat } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import useSwr from 'swr'
import { apiFetcher } from '../api/client'
import { Workout } from '../api/interfaces/workout'

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const LastWorkoutCard = () => {
  const { data: lastWorkout } = useSwr<Workout>('workouts/last', apiFetcher)
  const styles = useStyles()

  return (
    <Card>
      {lastWorkout ? (
        <>
          <CardContent>
            <Typography className={styles.title} color="textSecondary">
              Dernière séance
            </Typography>
            <Typography className={styles.title} color="textSecondary">
              Le {lightFormat(new Date(lastWorkout.date), 'dd/MM/yyyy')}
            </Typography>
            <Typography>
              Calories brulées : <strong>{lastWorkout.kcal}</strong> Kcal
            </Typography>
            <Typography>
              Distance parcourue : <strong>{lastWorkout.distance}</strong> KM
            </Typography>
          </CardContent>
          <CardActions>
            <Link to={`/workouts/${lastWorkout.id}`}>
              <IconButton>
                <OpenInBrowser />
              </IconButton>
            </Link>
          </CardActions>
        </>
      ) : (
        <CircularProgress />
      )}
    </Card>
  )
}

export default LastWorkoutCard
