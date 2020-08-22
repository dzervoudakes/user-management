import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { render } from '@testing-library/react';
import Home from '..';

describe('Home', () => {
  it('renders the title and description', () => {
    const { getByText } = render(
      <Router basename="/">
        <Switch>
          <Home />
        </Switch>
      </Router>
    );

    expect(getByText('Welcome to your new React App!')).toBeInTheDocument();
    expect(getByText('Made with ❤️')).toBeInTheDocument();
  });
});
