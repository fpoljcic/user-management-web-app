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
                <Title level={3} style={{fontFamily: 'Roboto-Thin', textAlign: 'center', paddingTop: '20px'}}>Welcome to your dashboard {user.name}!</Title>
                <div className="animatedLine"></div>
            </div>
            <TableEmployee />
        </div>
    );
}

export default Home;