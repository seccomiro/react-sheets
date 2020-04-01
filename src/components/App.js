import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Sheet from './Sheet';
import history from '../history';

const App = () => {
  return (
    <div>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Sheet} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
