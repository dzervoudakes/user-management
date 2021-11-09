import { ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { defaultTheme } from '@src/theme';

import App from './App';
import './scss/style.scss';

const Main: React.FC = () => (
  <Router basename="/">
    <ThemeProvider theme={defaultTheme}>
      <App />
    </ThemeProvider>
  </Router>
);

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
