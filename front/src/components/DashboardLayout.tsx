import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'
import { Add as AddIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import apiLogout from '../api/logout'
import AppIcon from './AppIcon'

const DashboardLayout: React.FC = ({ children }) => {
  const history = useHistory()

  async function logout() {
    const logoutResponse = await apiLogout()
    if (logoutResponse === 'ok') {
      history.push('/login')
    }
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Button variant="outlined">
              <AppIcon />
            </Button>
          </Link>
          <Link to="/workouts/new">
            <Button variant="contained">
              <AddIcon />
              Ajouter une séance
            </Button>
          </Link>

          <IconButton edge="end" onClick={logout} color="secondary">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {children}
    </>
  )
}

export default DashboardLayout
