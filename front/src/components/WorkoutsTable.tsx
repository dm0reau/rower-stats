import {
  CircularProgress,
  IconButton,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'
import { useHistory } from 'react-router'
import useSwr, { mutate } from 'swr'
import apiDeleteWorkout from '../api/delete-workout'
import { Workout } from '../api/interfaces/workout'
import { useCardStyles } from '../styles/card'
import { getReadableWorkoutProgram } from '../utils/workout-program-format'

const MyTable = styled(Table)({
  minWidth: 650,
})

const WORKOUTS_LIMIT = 20
const workoutsRequest = `workouts?limit=${WORKOUTS_LIMIT}`

const WorkoutsTable: React.FC = () => {
  const { data: workouts } = useSwr<Workout[]>(workoutsRequest)
  const styles = useCardStyles()
  const history = useHistory()

  const deleteWorkout = async (workoutId: number) => {
    if (!window.confirm('Êtes-vous de vouloir supprimer cette séance ?')) return
    await apiDeleteWorkout(workoutId)
    mutate(workoutsRequest)
  }

  return workouts ? (
    <Paper>
      <TableContainer component={Paper}>
        <Typography
          className={styles.title}
          style={{ paddingLeft: '1rem', paddingTop: '1rem' }}
          color="textSecondary"
        >
          Les {WORKOUTS_LIMIT} dernières séances
        </Typography>
        <MyTable aria-label="workouts table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Temps</TableCell>
              <TableCell>Distance parcourue</TableCell>
              <TableCell>Calories brulées</TableCell>
              <TableCell>Résistance</TableCell>
              <TableCell>Programme utilisé</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workouts.map((workout) => (
              <TableRow key={workout.id}>
                <TableCell component="th" scope="row">
                  {format(new Date(workout.date), 'EEEEEE d MMM', {
                    locale: fr,
                  })}
                </TableCell>
                <TableCell>{workout.time} min.</TableCell>
                <TableCell>{workout.distance} KM</TableCell>
                <TableCell>{workout.kcal} Kcal</TableCell>
                <TableCell>{workout.resistance}</TableCell>
                <TableCell>
                  {getReadableWorkoutProgram(workout.program)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => history.push(`/workouts/edit/${workout.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => workout.id && deleteWorkout(workout.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MyTable>
      </TableContainer>
    </Paper>
  ) : (
    <CircularProgress />
  )
}

export default WorkoutsTable
