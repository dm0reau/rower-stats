import {
  Box,
  Button,
  Container,
  makeStyles,
  Paper,
  TextField,
} from '@material-ui/core'
import { lightFormat } from 'date-fns'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { getDefaultDateFormat } from '../utils/date-format'

const useStyles = makeStyles({
  form: {
    textAlign: 'center',
    padding: '1rem',
  },
  fieldBox: {
    marginTop: '0.5rem',
  },
  textField: {
    minWidth: '15rem',
  },
})

const WorkoutFormPage: React.FC = () => {
  const styles = useStyles()

  return (
    <DashboardLayout>
      <Container maxWidth="lg">
        <Paper>
          <form className={styles.form}>
            <Box className={styles.fieldBox}>
              <TextField
                id="spm"
                className={styles.textField}
                type="number"
                label="SPM moyen"
                value="0"
              />
            </Box>
            <Box className={styles.fieldBox}>
              <TextField
                id="time"
                className={styles.textField}
                type="number"
                label="Temps de la séance (en min)"
              />
            </Box>
            <Box className={styles.fieldBox}>
              <TextField
                id="distance"
                className={styles.textField}
                type="number"
                label="Distance (en KM)"
              />
            </Box>
            <Box className={styles.fieldBox}>
              <TextField
                id="kcal"
                className={styles.textField}
                type="number"
                label="Calories (en kcal)"
              />
            </Box>
            <Box className={styles.fieldBox}>
              <TextField
                id="date"
                className={styles.textField}
                type="date"
                label="Date"
                defaultValue={lightFormat(new Date(), getDefaultDateFormat())}
              />
            </Box>
            <Box className={styles.fieldBox}>
              <Button
                type="submit"
                className={styles.textField}
                color="primary"
                variant="contained"
              >
                Ajouter
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </DashboardLayout>
  )
}

export default WorkoutFormPage
