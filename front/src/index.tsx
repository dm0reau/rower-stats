import { ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import * as serviceWorker from './serviceWorker'
import theme from './theme'

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <footer>
        <div>
          Logo made by
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            &nbsp;Freepik
          </a>
          &nbsp;from
          <a href="https://www.flaticon.com/" title="Flaticon">
            &nbsp;www.flaticon.com
          </a>
        </div>
      </footer>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
