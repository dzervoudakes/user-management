/**
 * Default application theme for Material UI theme provider.
 * @packageDocumentation
 */
import { createTheme } from '@material-ui/core/styles';

export const defaultTheme = createTheme({
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
      main: '#1967d2'
    },
    secondary: {
      main: '#d63b00'
    },
    error: {
      main: '#d21500'
    }
  }
});

export default defaultTheme;
