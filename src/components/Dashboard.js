import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from '../utilities/PrivateRoute';

import Home from './Home';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import ManageEmployees from './ManageEmployees';


import MyHeader from './MyHeader';
import MyFooter from './MyFooter';
import CashRegister from './CashRegister';

const { Content } = Layout;

function Dashboard(props) {
  return (
    <Router>
      <Layout className="layout">
        <MyHeader {...props} />
        <Content className="content" style={{ padding: '16px 50px' }}>
          <PrivateRoute path="/dashboard/home" component={Home} />
          <PrivateRoute path="/dashboard/add_employee" component={AddEmployee} />
          <PrivateRoute path="/dashboard/manage_employees" component={ManageEmployees} />
          <PrivateRoute path="/dashboard/update_employee/:id" component={UpdateEmployee} />
          <PrivateRoute path="/dashboard/cash_register/:id" component={CashRegister} />
        </Content>
        <MyFooter />
      </Layout>
    </Router>
  );
}

export default Dashboard;