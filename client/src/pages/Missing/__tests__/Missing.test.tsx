import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Missing from '..';

describe('Missing', () => {
  it('renders the title and description', () => {
    render(
      <Router basename="/">
        <Switch>
          <Missing />
        </Switch>
      </Router>
    );

    expect(screen.getByText("That's a 404")).toBeInTheDocument();
    expect(screen.getByText('You must be lost...')).toBeInTheDocument();
  });
});
