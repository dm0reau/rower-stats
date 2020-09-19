import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core'
import { OpenInBrowser } from '@material-ui/icons'
import { lightFormat } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Workout } from '../api/interfaces/workout'

interface Props {
  workout: Workout
}

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
})

const LastWorkoutCard = ({ workout }: Props) => {
  const styles = useStyles()

  return (
    <Card>
      <CardContent>
        <Typography className={styles.title} color="textSecondary">
          Dernière séance
        </Typography>
        <Typography className={styles.title} color="textSecondary">
          Le {lightFormat(new Date(workout.date), 'dd/MM/yyyy')}
        </Typography>
        <Typography>
          Calories brulées : <strong>{workout.kcal}</strong> Kcal
        </Typography>
        <Typography>
          Distance parcourue : <strong>{workout.distance}</strong> KM
        </Typography>
      </CardContent>
      <CardActions>
        <Link to={`/workouts/${workout.id}`}>
          <IconButton>
            <OpenInBrowser />
          </IconButton>
        </Link>
      </CardActions>
    </Card>
  )
}

export default LastWorkoutCard
