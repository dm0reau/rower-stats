import { Box, Fab, styled } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'

const FixedRightBox = styled(Box)({
  width: '100%',
  textAlign: 'right',
  marginBottom: '1rem',
})

const AddFab = () => {
  return (
    <FixedRightBox>
      <Link to="/workouts/new">
        <Fab aria-label="add" color="primary">
          <AddIcon />
        </Fab>
      </Link>
    </FixedRightBox>
  )
}

export default AddFab
