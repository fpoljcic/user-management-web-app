import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from "react-router-dom";
import { removeUserSession } from '../utilities/Common';
import Img from 'react-image'
import Notifications from './Notifications';

const { Header } = Layout;


function MyHeader(props) {
    const [selected, setSelected] = useState("1");

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
                selectedKeys={[selected]}
            >
                <Menu.Item key="1" onClick={() => setSelected("1")}>
                    Home
                    <Link to="/dashboard/home" />
                </Menu.Item>

                <Menu.Item key="2" onClick={() => setSelected("2")}>
                    Managers
                    <Link to="/dashboard/managers" />
                </Menu.Item>

                <Menu.Item key="3" onClick={() => setSelected("3")}>
                    Cashiers
                    <Link to="/dashboard/cashiers" />
                </Menu.Item>

                <Menu.Item key="4" onClick={() => setSelected("4")}>
                    Add employees
                    <Link to="/dashboard/add_employee" />
                </Menu.Item>

                <Menu.Item key="5" onClick={() => setSelected("5")}>
                    Manage employees
                    <Link to="/dashboard/manage_employees" />
                </Menu.Item>

                <Menu.Item key="6" onClick={() => setSelected("6")}>
                    User log
                    <Link to="/dashboard/user_log" />
                </Menu.Item>

                <Menu.Item key="7" style={{ float: "right" }} onClick={handleLogout}>
                    <Img src={require('../img/logout.png')} width='20px' height='20px' />
                    {" "}Log out
                </Menu.Item>

                <Menu.Item disabled key="8" style={{ float: "right", zIndex: 1000 }} >
                    <Notifications setSelected={setSelected} />
                </Menu.Item>
            </Menu>

        </Header>
    );
}

export default MyHeader;