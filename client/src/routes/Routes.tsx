import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@src/pages/Home';
import Missing from '@src/pages/Missing';
import { dynamicImport } from '@src/hocs';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/new-user"
      component={dynamicImport(
        () => import(/* webpackChunkName: 'newUser' */ '@src/pages/NewUser')
      )}
    />
    <Route component={Missing} />
  </Switch>
);

export default Routes;
