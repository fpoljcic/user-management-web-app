import React, { useState } from 'react';
import { Form, Input, Button, Typography, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import Img from 'react-image'

import { setUserSession } from '../utilities/Common';

const { Title } = Typography;

const Login = (props) => {
    const [showWarning, setShowWarning] = useState(false);
    const [error, setError] = useState(String);

    const hideWarning = () => {
        setShowWarning(false);
    }

    const onFinish = values => {
        // Saljemo zahtjev serveru, dobijamo token nazad
        axios.post('https://main-server-si.herokuapp.com/api/auth/login', {
            username: values.username,
            password: values.password,
            role: "ROLE_MANAGER"
        }).then((response) => {
            if (response.data.length === 0) {
                setShowWarning(true);
                return;
            }
            var currentdate = new Date();
            var date = currentdate.getDate() + "."
                + (currentdate.getMonth() + 1) + "."
                + currentdate.getFullYear();
            var time = currentdate.getHours() + ":"
                + currentdate.getMinutes();
            response.data.profile.loginDate = date;
            response.data.profile.loginTime = time;
            setUserSession(response.data.token, response.data.profile);
            console.log(response.data.profile);
            props.history.push('/dashboard/home');
        }).catch(error => {
            if (error.response == null) {
                setError("Please check your internet connection!");
                return;
            }
            if (error.response.status === 401)
                setError("Wrong Username or Password!");
            else
                setError(error.response.data.message);
            setShowWarning(true);
        });
    };

    const loginStyle = {
        margin: 'auto',
        texAlign: 'center',
        width: '400px',
    }

    return (
        <div className="login-container">
            <div style={loginStyle}>
                <Img src={require('../img/team-image.svg')} width='100%' height='200px' />
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Title style={{ textAlign: "center", fontFamily: 'Roboto-Thin' }} level={2}>User Management Web App</Title>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" onChange={hideWarning} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={hideWarning}
                        />
                    </Form.Item>
                    {showWarning ?
                        <Alert
                            message="Error"
                            description={error}
                            type="error"
                            style={{ marginBottom: '20px' }}
                            showIcon
                        /> : null
                    }
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;