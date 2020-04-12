import React, { Component } from 'react'
import { Table } from 'antd';
import { getToken } from '../utilities/Common';
import axios from 'axios';

const columns = [
    {
        title: 'Date',
        dataIndex: 'timestamp',
        sorter: (a, b) => { return customCompareDates(a.timestamp, b.timestamp) }
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

function customCompareDates(a, b) {
    let dateA = a.replace(":", ".").replace(" ", ".").split(".");
    let dateB = b.replace(":", ".").replace(" ", ".").split(".");
    dateA = (new Date(parseInt(dateA[2]), parseInt(dateA[1]), parseInt(dateA[0]), parseInt(dateA[3]), parseInt(dateA[4]))).getTime();
    dateB = (new Date(parseInt(dateB[2]), parseInt(dateB[1]), parseInt(dateB[0]), parseInt(dateB[3]), parseInt(dateB[4]))).getTime();
    if (dateA > dateB)
        return 1;
    if (dateA < dateB)
        return -1;
    return 0;
}

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
        const id = this.props.match.params.id;
        axios.get(`https://main-server-si.herokuapp.com/api/users/${id}/username`, { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {
                this.setState({
                    employeeFullName: `${response.data.name} ${response.data.surname}`,
                    username: response.data.username
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


        return (
            <div style={{ height: '79vh' }}>
                <h1>Overview for {this.state.employeeFullName}'s receipts</h1>
                <Table columns={columns} dataSource={data} />
            </div>
        )
    }
}

