import React from 'react';
import { Layout } from 'antd';
import { getUser } from '../utilities/Common';

const { Footer } = Layout;

function MyFooter(props) {
    const user = getUser();

    return (
        <Footer className="footerStyle">
            <a target="_blank" href="https://github.com/fpoljcic/user-management-web-app">About</a> |
            <a target="_blank" href="mailto:fpoljcic1@etf.unsa.ba"> Contact us</a>
            <div style={{ marginTop: '-20px', textAlign: 'right' }}>
                Last login at {user.loginDate + " " + user.loginTime}
            </div>
        </Footer>
    );
}

export default MyFooter;