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
      <Switch>
        <PublicRoute exact path="/" component={Login} />
        <PrivateRoute path="/dashboard/home" page="1" component={Dashboard} />
        <PrivateRoute path="/dashboard/add_employee" page="3" component={Dashboard} />
        <PrivateRoute path="/dashboard/manage_employees" page="3" component={Dashboard} />
        <PrivateRoute path="/dashboard/update_employee/:id" component={Dashboard} />
        <PrivateRoute path="/dashboard/cash_register/:id" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
