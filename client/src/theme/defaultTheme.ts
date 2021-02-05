/**
 * Default application theme for Material UI theme provider.
 * @packageDocumentation
 */
import { createMuiTheme } from '@material-ui/core/styles';

export const defaultTheme = createMuiTheme({
  spacing: 4,
  typography: {
    fontFamily: '"Droid Sans", sans-serif',
    h1: {
      fontSize: '1.25rem',
      fontWeight: 400,
      lineHeight: '3.125rem'
    },
    h2: {
      color: '#343a40',
      fontSize: '1.25rem',
      fontWeight: 700,
      marginBottom: '0.9375rem'
    }
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
