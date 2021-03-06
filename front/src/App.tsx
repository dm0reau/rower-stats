import { StylesProvider } from '@material-ui/core/styles'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { apiFetcher } from './api/client'
import PrivateRoute from './components/PrivateRoute'
import EditWorkoutPage from './pages/EditWorkoutPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NewWorkoutPage from './pages/NewWorkoutPage'

const App: React.FC = () => {
  return (
    <StylesProvider injectFirst>
      <SWRConfig
        value={{
          fetcher: apiFetcher,
        }}
      >
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>
            <PrivateRoute path="/workouts/new" exact={true}>
              <NewWorkoutPage />
            </PrivateRoute>
            <PrivateRoute path="/workouts/edit/:workoutId">
              <EditWorkoutPage />
            </PrivateRoute>
            <PrivateRoute path="/">
              <HomePage />
            </PrivateRoute>
          </Switch>
        </Router>
      </SWRConfig>
    </StylesProvider>
  )
}

export default App
