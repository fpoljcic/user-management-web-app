import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';

import Login from "./components/Login";
import Dashboard from './components/Dashboard';
import PrivateRoute from './utilities/PrivateRoute';
import PublicRoute from './utilities/PublicRoute';

function App() {
  return (
    <Router>
      <div className="content">
        <Switch>
          <PublicRoute exact path="/" component={Login} />
          <PrivateRoute path="/dashboard/home" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
