import React from 'react';
import { Typography } from 'antd';
import { getUser } from '../utilities/Common';
import TableEmployee from './TableEmployee';

const { Title } = Typography;

function Home(props) {
    const user = getUser();
    return (
        <div>
            <div className="site-layout-content">
                <Title level={3} style={{ fontFamily: 'Roboto-Thin', textAlign: 'center', paddingTop: '10px' }}>Welcome to your dashboard {user.name}!</Title>
                <div style={{ marginBottom: '20px' }} className="animatedLine"></div>
            </div>
            <TableEmployee />
        </div>
    );
}

export default Home;