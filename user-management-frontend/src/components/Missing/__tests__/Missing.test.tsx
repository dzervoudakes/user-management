import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { render } from '@testing-library/react';
import Missing from '..';

describe('Missing', () => {
  it('renders the title and description', () => {
    const { getByText } = render(
      <Router basename="/">
        <Switch>
          <Missing />
        </Switch>
      </Router>
    );

    expect(getByText("That's a 404")).toBeInTheDocument();
    expect(getByText('You must be lost...')).toBeInTheDocument();
  });
});
