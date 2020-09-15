import { AppBar, Box, IconButton, styled, Toolbar } from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
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

  const BodyBox = styled(Box)({
    padding: '1rem',
  })

  const LogoutButton = styled(IconButton)({
    position: 'absolute',
    right: '1rem',
  })

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton>
              <AppIcon />
            </IconButton>
          </Link>

          <LogoutButton onClick={logout}>
            <ExitToAppIcon />
          </LogoutButton>
        </Toolbar>
      </AppBar>

      <BodyBox>{children}</BodyBox>
    </>
  )
}

export default DashboardLayout
