import React from 'react';
import { Typography } from 'antd';
import TableManager from './TableManager';

const { Title } = Typography;

function Manager(props) {
    return (
        <div>
            <div className="site-layout-content">
                <Title style={{ fontFamily: 'Roboto-Thin' }} level={3}>List of all managers</Title>
            </div>
            <TableManager />
        </div>
    );
}

export default Manager;