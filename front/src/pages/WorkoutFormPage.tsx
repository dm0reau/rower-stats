import { Box, Button, makeStyles, Paper, TextField } from '@material-ui/core'
import { lightFormat } from 'date-fns'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
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

  return (
    <DashboardLayout>
      <Paper className={styles.paper}>
        <form className={styles.form}>
          <Box className={styles.fieldBox}>
            <TextField
              id="spm"
              fullWidth
              type="number"
              label="SPM moyen"
              value="0"
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              id="time"
              fullWidth
              type="number"
              label="Temps de la séance (en min)"
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              id="distance"
              fullWidth
              type="number"
              label="Distance (en KM)"
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              id="kcal"
              fullWidth
              type="number"
              label="Calories (en kcal)"
            />
          </Box>
          <Box className={styles.fieldBox}>
            <TextField
              id="date"
              fullWidth
              type="date"
              label="Date"
              defaultValue={lightFormat(new Date(), getDefaultDateFormat())}
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
