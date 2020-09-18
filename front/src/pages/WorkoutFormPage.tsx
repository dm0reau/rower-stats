import { Box, Button, makeStyles, Paper, TextField } from '@material-ui/core'
import { lightFormat } from 'date-fns'
import React from 'react'
import { useForm } from 'react-hook-form'
import DashboardLayout from '../components/DashboardLayout'
import { WorkoutFields } from '../interfaces/WorkoutFields'
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
  const onSubmit = (data: any) => console.log(data)
  const { handleSubmit, register } = useForm<WorkoutFields>()

  return (
    <DashboardLayout>
      <Paper className={styles.paper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Box className={styles.fieldBox}>
            <TextField
              name="spm"
              type="number"
              label="SPM moyen"
              fullWidth
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="time"
              type="number"
              label="Temps de la séance (en min)"
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
              inputProps={{ step: 0.1 }}
              required={true}
              inputRef={register}
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              name="kcal"
              fullWidth
              type="number"
              label="Calories (en kcal)"
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
