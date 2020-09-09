import React from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import useSWR from 'swr'
import { apiFetcher } from '../api/client'
import { User } from '../api/interfaces/user'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { error } = useSWR<User>('/auth/me', apiFetcher)
  const location = useLocation<{ user?: User }>()

  return (
    <Route
      {...rest}
      render={() =>
        !error || location.state?.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
