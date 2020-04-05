import React from 'react';
import { Typography } from 'antd';
import TableCashier from './TableCashier';

const { Title } = Typography;

function Cashier(props) {
    return (
        <div>
            <div className="site-layout-content">
                <Title level={3}>Here is a list of all cashiers!</Title>
            </div>
            <TableCashier />
        </div>
    );
}

export default Cashier;