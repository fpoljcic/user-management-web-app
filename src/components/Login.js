import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import axios from 'axios';

import { setUserSession } from '../utilities/Common';

const { Title } = Typography;

const Login = (props) => {
    const [, setLoading] = useState(false);
    const [, setError] = useState(null);

    const onFinish = values => {
        setError(null);
        setLoading(true);

        // Saljemo zahtjev serveru, dobijamo token nazad
        axios.post('https://main-server-si.herokuapp.com/api/auth/login', {
            username: values.username,
            password: values.password,
            role: "ROLE_MANAGER"
        }).then((response) => {
            setLoading(false);
            if (response.data.length === 0) {
                setError("Something went wrong. Please try again later.");
                alert("Pogresni podaci");
                return;
            }
            // Rucno kreiramo usera, jer ne dobijemo nikakvu informaciju o user-u od servera osim tokena
            let user = {
                username: values.username,
                role: "ROLE_MANAGER"
            }
            setUserSession(response.token, user);
            props.history.push('/dashboard/home');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    };

    const loginStyle = {
        margin: 'auto',
        texAlign: 'center',
        paddingTop: '10%',
        width: '400px',
        height: '100vh'
    }

    return (
        <div style={loginStyle}>
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
            >
                <Title style={{ textAlign: "center" }} level={2}>User Management Web App</Title>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                    />
                </Form.Item>
                <Form.Item>
                    <Button style={{ width: '100%' }} type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;