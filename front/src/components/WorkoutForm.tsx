import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  NativeSelect,
  Paper,
  TextField,
} from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import { WorkoutProgram } from '../api/interfaces/workout-program'
import { WorkoutFields } from '../interfaces/workout-fields'
import { getFormattedDate } from '../utils/date-format'
import { getReadableWorkoutProgram } from '../utils/workout-program-format'
import DashboardLayout from './DashboardLayout'

interface Props {
  onSubmit: (workoutFields: WorkoutFields) => Promise<void>
  defaultValues?: WorkoutFields
}

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

const WorkoutForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const styles = useStyles()
  const { handleSubmit, register } = useForm<WorkoutFields>({
    defaultValues,
  })

  return (
    <DashboardLayout>
      <Paper className={styles.paper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.fieldBox}>
            <FormControl>
              <InputLabel>Programme</InputLabel>
              <NativeSelect
                inputRef={register}
                name="program"
                fullWidth
                required={true}
                defaultValue={WorkoutProgram.Kcal1}
              >
                {Object.values(WorkoutProgram).map((workoutProgram) => (
                  <option key={workoutProgram} value={workoutProgram}>
                    {getReadableWorkoutProgram(
                      workoutProgram as WorkoutProgram,
                    )}
                  </option>
                ))}
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
              defaultValue={30}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="resistance"
              fullWidth
              type="number"
              label="Résistance max"
              inputProps={{ min: 1, max: 15 }}
              required={true}
              inputRef={register}
              defaultValue={8}
            />
          </Box>
          <Box className={styles.fieldBox}>
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
              name="distance"
              fullWidth
              type="number"
              label="Distance (en KM)"
              inputProps={{ step: 0.01, min: 0.01 }}
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
              defaultValue={getFormattedDate(new Date())}
              inputRef={register}
            />
          </Box>
          <Box className={styles.submitButton}>
            <Button type="submit" fullWidth color="primary" variant="contained">
              {defaultValues ? 'Editer' : 'Ajouter'}
            </Button>
          </Box>
        </form>
      </Paper>
    </DashboardLayout>
  )
}

export default WorkoutForm
