import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { removeUserSession } from '../utilities/Common';

const { Header } = Layout;

function MyHeader(props) {
    // odjava korisnika
    const handleLogout = () => {
        removeUserSession();
        props.history.push('/');
    }

    return (
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[props.page]}
            >
                <Menu.Item key="1">
                    Home
                    <Link to="/dashboard/home" />
                </Menu.Item>
                <Menu.Item key="2">
                    Show employees
                    <Link to="/dashboard/show_employees" />
                </Menu.Item>
                <Menu.Item key="3">
                    Add employees
                    <Link to="/dashboard/add_employee" />
                </Menu.Item> 
                <Menu.Item key="4" style={{ float: "right" }} onClick={handleLogout}>
                    Log out
                </Menu.Item>                              
            </Menu>
        </Header>
    );
}

export default MyHeader;