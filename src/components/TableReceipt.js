import React, { Component } from 'react'
import { Table } from 'antd';
import { getToken } from '../utilities/Common';
import axios from 'axios';

const columns = [
    {
        title: 'Date',
        dataIndex: 'timestamp',
        sorter: { compare: (a, b) => a.timestamp.localeCompare(b.timestamp) }
    },
    {
        title: 'Receipt ID',
        dataIndex: 'receiptId',
        sorter: { compare: (a, b) => a.receiptId.localeCompare(b.receiptId) }
    },
    {
        title: 'Cash register ID',
        dataIndex: 'cashRegisterId',
        sorter: { compare: (a, b) => a.cashRegisterId - b.cashRegisterId }
    },
    {
        title: 'Office ID',
        dataIndex: 'officeId',
        sorter: { compare: (a, b) => a.officeId - b.officeId }
    },
    {
        title: 'Payment method',
        dataIndex: 'paymentMethod',
        sorter: { compare: (a, b) => a.paymentMethod.localeCompare(b.paymentMethod) }
    },
    {
        title: 'Total price',
        dataIndex: 'totalPrice',
        sorter: { compare: (a, b) => a.totalPrice - b.totalPrice }
    }
];

function timeConverter(timestamp) {
    let a = new Date(timestamp);
    let year = a.getFullYear();
    let month = a.getMonth() + 1;
    let date = a.getDate();
    let hour = a.getHours() < 10 ? '0' + a.getHours() : a.getHours();
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    let time = date + '.' + month + '.' + year + ' ' + hour + ':' + min;
    return time;
}

export default class ReceiptsOverview extends Component {
    constructor(props) {
        super(props);

        this.state = {
            receipt: [],
            employeeFullName: '',
            username: ''
        };
    }

    componentDidMount() {
        this.getEmployeeNameFromId();
    }

    getReceipt() {
        axios.get(`https://main-server-si.herokuapp.com/api/users/${this.state.username}/receipts`, { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {
                this.setState({
                    receipt: response.data
                }, (res) => {
                    console.log(this.state);
                });
            })
            .catch(err => console.log(err));
    }

    getEmployeeNameFromId() {
        // Make a request for an employee name and username with a given ID
        axios.get(`https://main-server-si.herokuapp.com/api/employees`, { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {
                let wanted = response.data.filter((entry) => {
                    return entry.userId == this.props.match.params.id;
                });
                this.setState({
                    employeeFullName: `${wanted[0].name} ${wanted[0].surname}`,
                    username: `${wanted[0].username}`
                });
                this.getReceipt();
            })
            .catch(err => console.log(err));
    }

    render() {
        const data = [];
        const length = this.state.receipt.length;

        for (let i = 0; i < length; i++) {
            data.push({
                receiptId: this.state.receipt[i].receiptId,
                timestamp: timeConverter(this.state.receipt[i].timestamp),
                cashRegisterId: this.state.receipt[i].cashRegisterId,
                officeId: this.state.receipt[i].officeId,
                paymentMethod: this.state.receipt[i].paymentMethod,
                totalPrice: this.state.receipt[i].totalPrice
            });
        }

        console.log(data);

        return (
            <div style={{ height: '79vh' }}>
                <h1>Overview for {this.state.employeeFullName}'s receipts</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

