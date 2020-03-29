import React from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router } from "react-router-dom";

import PrivateRoute from '../utilities/PrivateRoute';

import Home from './Home';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';

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
          <PrivateRoute path="/dashboard/add_employee" component={AddEmployee} />
          <PrivateRoute path="/dashboard/update_employee/:id" component={UpdateEmployee} />
        </Content>
        <MyFooter />
      </Layout>
    </Router>
  );
}

export default Dashboard;