import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@src/components/Home';
import Missing from '@src/components/Missing';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route component={Missing} />
  </Switch>
);

export default Routes;
