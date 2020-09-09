import { Button, TextField } from '@material-ui/core'
import React from 'react'
import DashboardLayout from '../components/DashboardLayout'

const WorkoutFormPage: React.FC = () => {
  return (
    <DashboardLayout>
      <form>
        <TextField id="spm" type="number" label="SPM moyen" value="0" />
        <TextField
          id="time"
          type="number"
          label="Temps de la séance (en min)"
        />
        <TextField id="distance" type="number" label="Distance" />
        <TextField id="kcal" type="number" label="Calories (en kcal)" />
        <TextField id="date" type="date" label="Date" />
        <Button type="submit" color="primary">
          Ajouter
        </Button>
      </form>
    </DashboardLayout>
  )
}

export default WorkoutFormPage
