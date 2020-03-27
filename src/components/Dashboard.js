import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from '../utilities/PrivateRoute';

import Home from './Home';
import ShowEmployees from './ShowEmployees';
import AddEmployee from './AddEmployee';

import MyHeader from './MyHeader';
import MyFooter from './MyFooter';

const { Content } = Layout;

function Dashboard(props) {
  
  return (
    <Router>
      <Layout className="layout">
        <MyHeader {...props} />
        <Content className="content" style={{ padding: '16px 50px' }}>
          <PrivateRoute path="/dashboard/home" component={Home} />
          <PrivateRoute path="/dashboard/show_employees" component={ShowEmployees} />
          <PrivateRoute path="/dashboard/add_employee" component={AddEmployee} />
        </Content>
        <MyFooter />
      </Layout>
    </Router>
  );
}

export default Dashboard;