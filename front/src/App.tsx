import { StylesProvider } from '@material-ui/core/styles'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import WorkoutFormPage from './pages/WorkoutFormPage'

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <Router>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/workouts/new" exact={true}>
            <WorkoutFormPage />
          </PrivateRoute>
          <PrivateRoute path="/">
            <HomePage />
          </PrivateRoute>
        </Switch>
      </Router>
    </StylesProvider>
  )
}

export default App
