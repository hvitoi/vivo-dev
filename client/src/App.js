// Packages
import React from 'react';

// Componentes
import { Router, Route, Switch } from 'react-router-dom';
import Form from './Form';
import Success from './Success';
import Error from './Error';

// Histórico de navegação
import history from './history';

// ---

const App = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/success" component={Success} />
        <Route path="/error" component={Error} />
        <Route path="/" component={Form} />
      </Switch>
    </Router>
  );
};

export default App;
