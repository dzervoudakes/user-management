/**
 * Default application theme for Material UI theme provider.
 * @packageDocumentation
 */
import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
  typography: {
    fontFamily: '"Droid Sans", sans-serif'
  },
  palette: {
    primary: {
      main: '#387bb4'
    },
    secondary: {
      main: '#ff881a'
    },
    error: {
      main: '#d21500'
    }
  }
});

export default defaultTheme;
