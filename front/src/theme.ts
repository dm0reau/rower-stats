import { createMuiTheme } from '@material-ui/core/styles'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1D7874',
      light: '#53D8FB',
      dark: '#0D1321',
    },
    secondary: {
      main: '#845A6D',
      light: '#B098A4',
      dark: '#A80874',
    },
    error: {
      main: '#721121',
      light: '#A5402D',
    },
    background: {
      default: '#fff',
    },
  },
})

export default theme
