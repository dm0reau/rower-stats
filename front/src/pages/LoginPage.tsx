import {
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import React, { FormEvent, useState } from 'react'
import { useHistory, useLocation } from 'react-router'
import apiLogin from '../api/login'
import LogoCredits from '../components/LogoCredits'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasLoginError, setHasLoginError] = useState(false)
  const history = useHistory()
  const location = useLocation<{ from: Location }>()
  const { from } = location.state || { from: { pathname: '/' } }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const user = await apiLogin(username, password)
    setHasLoginError(!user)
    if (user !== null) {
      history.push(from.pathname, { user })
    }
  }

  return (
    <>
      <FormBox>
        {hasLoginError && (
          <ErrorAlert severity="error">
            Vos identifiants semblent incorrects
          </ErrorAlert>
        )}
        <form onSubmit={onSubmit}>
          <FormGrid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Typography variant="h4">Login</Typography>
            <TextField
              id="username"
              label="Utilisateur"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              id="password"
              type="password"
              label="Mot de passe"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <ConnectionButton type="submit" variant="contained" color="primary">
              Connexion
            </ConnectionButton>
          </FormGrid>
        </form>
      </FormBox>

      <Footer>
        <LogoCredits />
      </Footer>
    </>
  )
}

const FormBox = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
})

const FormGrid = styled(Grid)({
  border: '1px solid grey',
  padding: '1rem',
  borderRadius: 10,
})

const ConnectionButton = styled(Button)({
  marginTop: '1rem',
})

const ErrorAlert = styled(Alert)({
  marginBottom: 15,
})

const Footer = styled(Box)({
  position: 'absolute',
  bottom: '1rem',
  margin: 0,
  width: '100%',
  textAlign: 'center',
})

export default LoginPage
