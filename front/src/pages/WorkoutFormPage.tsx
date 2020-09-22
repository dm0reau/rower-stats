import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  makeStyles,
  NativeSelect,
  Paper,
  Slider,
  TextField,
} from '@material-ui/core'
import { lightFormat } from 'date-fns'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router'
import addWorkout from '../api/add-workout'
import { Workout } from '../api/interfaces/workout'
import { WorkoutProgram } from '../api/interfaces/workout-program'
import DashboardLayout from '../components/DashboardLayout'
import { WorkoutFields } from '../interfaces/workout-fields'
import { getDefaultDateFormat } from '../utils/date-format'

const useStyles = makeStyles({
  paper: {
    minWidth: '16rem',
    maxWidth: '30rem',
    margin: 'auto',
  },
  form: {
    padding: '1rem',
  },
  fieldBox: {
    marginTop: '0.5rem',
  },
  submitButton: {
    marginTop: '2rem',
  },
})

const WorkoutFormPage: React.FC = () => {
  const styles = useStyles()
  const history = useHistory()
  const onSubmit = async (workoutFields: WorkoutFields) => {
    const newWorkout: Workout = {
      distance: +workoutFields.distance,
      kcal: +workoutFields.kcal,
      resistance: +workoutFields.resistance,
      strokes: +workoutFields.strokes,
      time: +workoutFields.time,
      program: workoutFields.program,
      date: new Date(workoutFields.date),
    }
    await addWorkout(newWorkout)
    history.push('/workouts')
  }
  const { handleSubmit, register, control } = useForm<WorkoutFields>()

  return (
    <DashboardLayout>
      <Paper className={styles.paper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.fieldBox}>
            <FormControl fullWidth>
              <InputLabel>Programme</InputLabel>
              <NativeSelect
                inputRef={register}
                name="program"
                fullWidth
                required={true}
                defaultValue={WorkoutProgram.Kcal1}
              >
                <option value={WorkoutProgram.Kcal1}>Kcal 1</option>
                <option value={WorkoutProgram.Kcal2}>Kcal 2</option>
                <option value={WorkoutProgram.Fitness1}>Fitness 1</option>
                <option value={WorkoutProgram.Fitness2}>Fitness 2</option>
                <option value={WorkoutProgram.Fitness3}>Fitness 3</option>
              </NativeSelect>
            </FormControl>
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="time"
              type="number"
              label="Temps de la séance (en min)"
              inputProps={{ step: 5, min: 5 }}
              fullWidth
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="distance"
              fullWidth
              type="number"
              label="Distance (en KM)"
              inputProps={{ step: 0.1, min: 0.1 }}
              required={true}
              inputRef={register}
            />
          </Box>
          <Box style={{ marginTop: '1.5rem' }}>
            <FormControl fullWidth>
              <FormLabel>Résistance</FormLabel>
              <Controller
                as={Slider}
                control={control}
                marks
                valueLabelDisplay="auto"
                name="resistance"
                defaultValue={8}
                min={1}
                max={15}
              />
            </FormControl>
          </Box>
          <Box>
            <TextField
              name="kcal"
              fullWidth
              type="number"
              label="Calories (en kcal)"
              inputProps={{ min: 1 }}
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="strokes"
              type="number"
              label="Cadence"
              inputProps={{ min: 1 }}
              fullWidth
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="spm"
              type="number"
              label="SPM moyen"
              inputProps={{ min: 1 }}
              fullWidth
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="date"
              fullWidth
              type="date"
              label="Date"
              required={true}
              defaultValue={lightFormat(new Date(), getDefaultDateFormat())}
              inputRef={register}
            />
          </Box>
          <Box className={styles.submitButton}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              Ajouter
            </Button>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  )
}

export default WorkoutFormPage
