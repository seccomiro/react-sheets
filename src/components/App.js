import React from 'react';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Sheet from './Sheet';
import history from '../history';

const App = () => {
  return (
    <div>
      <HashRouter history={history} basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/" exact component={Sheet} />
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
