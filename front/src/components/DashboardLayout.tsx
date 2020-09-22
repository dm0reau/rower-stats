import {
  AppBar,
  Box,
  Container,
  IconButton,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import { ExitToApp as ExitToAppIcon } from '@material-ui/icons'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import apiLogout from '../api/logout'
import AppIcon from './AppIcon'

const useStyles = makeStyles((theme) => ({
  appContainer: {
    backgroundColor: '#FFF',
    padding: 0,
    minHeight: '100vh',
    boxShadow: '5px 5px 8px 0px rgba(0,0,0,0.75)',
  },
  bodyBox: {
    padding: '1rem',
  },
  logoutButton: {
    position: 'absolute',
    right: '1rem',
    color: theme.palette.secondary.light,
  },
}))

const DashboardLayout: React.FC = ({ children }) => {
  const styles = useStyles()
  const history = useHistory()

  async function logout() {
    const logoutResponse = await apiLogout()
    if (logoutResponse === 'ok') {
      history.push('/login')
    }
  }

  return (
    <Container className={styles.appContainer} maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <IconButton>
              <AppIcon />
            </IconButton>
          </Link>

          <IconButton className={styles.logoutButton} onClick={logout}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box className={styles.bodyBox}>{children}</Box>
    </Container>
  )
}

export default DashboardLayout
