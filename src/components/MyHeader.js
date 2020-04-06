import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { removeUserSession } from '../utilities/Common';
import Img from 'react-image'

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
                    Managers
                    <Link to="/dashboard/managers" />
                </Menu.Item>

                <Menu.Item key="3">
                    Cashiers
                    <Link to="/dashboard/cashiers" />
                </Menu.Item>

                <Menu.Item key="4">
                    Add employees
                    <Link to="/dashboard/add_employee" />
                </Menu.Item>

                <Menu.Item key="5">
                    Manage employees
                    <Link to="/dashboard/manage_employees" />
                </Menu.Item>

                <Menu.Item key="6" style={{ float: "right" }} onClick={handleLogout}>
                    <Img src={require('../img/logout.png')} width='20px' height='20px' />
                    {" "}Log out
                </Menu.Item>
            </Menu>
        </Header>
    );
}

export default MyHeader;