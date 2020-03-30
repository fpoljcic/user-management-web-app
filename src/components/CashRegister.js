import React, { Component } from 'react'
import { Table } from 'antd';
import { getToken } from '../utilities/Common';
import axios from 'axios';
 
const columns = [
  {
    title: 'Office ID',
    dataIndex: 'officeId',
    sorter: {
      compare: (a, b) => a.officeId - b.officeId,
      multiple: 1,
    },
  },
  {
    title: 'Cash registers ID',
    dataIndex: 'cashRegisters',
  },
  {
    title: 'Manager',
    dataIndex: 'managerId',
  },
];


export default class CashRegister extends Component {
    render() {

        const data = [
           
          ];

        return (
         <div style={{height: '75vh'}}>
            <h1>Overview for 's registers</h1>
            <Table columns={columns} dataSource={data} />
        </div>                
        )
    }
}
