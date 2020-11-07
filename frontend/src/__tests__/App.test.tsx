import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the application', () => {
    const { getByText } = render(
      // <Router basename="/">
      <App />
      // </Router>
    );

    expect(getByText('placeholder')).toBeInTheDocument();
  });
});
