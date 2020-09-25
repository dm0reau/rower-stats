import {
  CircularProgress,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React from 'react'
import useSwr from 'swr'
import { Workout } from '../api/interfaces/workout'

const MyTable = styled(Table)({
  minWidth: 650,
})

const WorkoutsTable: React.FC = () => {
  const { data: workouts } = useSwr<Workout[]>('workouts')

  return workouts ? (
    <TableContainer component={Paper}>
      <MyTable aria-label="workouts table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Temps</TableCell>
            <TableCell align="right">Distance parcourue</TableCell>
            <TableCell align="right">Calories brulées</TableCell>
            <TableCell align="right">Résistance</TableCell>
            <TableCell align="right">Programme utilisé</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workouts.map((workout) => (
            <TableRow key={workout.id}>
              <TableCell component="th" scope="row">
                {workout.date}
              </TableCell>
              <TableCell align="right">{workout.time}</TableCell>
              <TableCell align="right">{workout.distance}</TableCell>
              <TableCell align="right">{workout.kcal}</TableCell>
              <TableCell align="right">{workout.resistance}</TableCell>
              <TableCell align="right">{workout.program}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MyTable>
    </TableContainer>
  ) : (
    <CircularProgress />
  )
}

export default WorkoutsTable
