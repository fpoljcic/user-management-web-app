import React from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const { Title } = Typography;

const Login = (props) => {
    const onFinish = values => {
        console.log(values);
    }

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