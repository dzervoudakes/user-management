import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '@src/pages/Home';
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
    <Route
      component={dynamicImport(
        () => import(/* webpackChunkName: 'missing' */ '@src/pages/Missing')
      )}
    />
  </Switch>
);

export default Routes;
