import React from 'react';
import { Typography } from 'antd';
import TableManager from './TableManager';

const { Title } = Typography;

function Manager(props) {
    return (
        <div>
            <div className="site-layout-content">
                <Title level={3}>Here is a list of all managers!</Title>
            </div>
            <TableManager />
        </div>
    );
}

export default Manager;