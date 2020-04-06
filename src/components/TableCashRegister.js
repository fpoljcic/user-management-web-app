import React, { Component } from 'react'
import { Table } from 'antd';
import { getToken } from '../utilities/Common';
import axios from 'axios';

const columns = [
  {
    title: 'Office ID',
    dataIndex: 'officeId',
    sorter: { compare: (a, b) => a.officeId - b.officeId }
  },
  {
    title: 'Cash register ID',
    dataIndex: 'cashRegister',
    sorter: { compare: (a, b) => a.cashRegister - b.cashRegister }
  },
  {
    title: 'Cash register name',
    dataIndex: 'cashRegisterName',
    sorter: { compare: (a, b) => a.cashRegisterName.localeCompare(b.cashRegisterName) }
  },
  {
    title: 'Manager ID',
    dataIndex: 'managerId',
    sorter: { compare: (a, b) => a.managerId - b.managerId }
  },
];

export default class CashRegistersOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      office: [],
      officeId: '',
      cashRegisters: [],
      managerId: '',
      employeeFullName: '',
    };
  }

  componentDidMount() {
    this.getOffice();
    this.getEmployeeNameFromId();
  }

  getOffice() {
    // Make a request for an office with a given ID
    const employee = this.props.match.params.id;
    axios.get(`https://main-server-si.herokuapp.com/api/business/employees/${employee}/office`, { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
        this.setState({
          office: response.data[0],
          officeId: response.data[0].id,
          cashRegisters: response.data[0].cashRegisters,
          managerId: response.data[0].manager.id,
        }, (res) => {
          console.log(this.state);
        });
      })
      .catch(err => console.log(err));
  }

  getEmployeeNameFromId() {
    // Make a request for an employee name with a given ID
    const id = this.props.match.params.id;
    axios.get(`https://main-server-si.herokuapp.com/api/users/${id}/username`, { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
        this.setState({
          employeeFullName: `${response.data.name} ${response.data.surname}`
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    const data = [];
    const length = this.state.cashRegisters.length;

    for (let i = 0; i < length; i++) {
      data.push({
        officeId: this.state.officeId,
        cashRegister: this.state.cashRegisters[i].id,
        cashRegisterName: this.state.cashRegisters[i].name,
        managerId: this.state.managerId,
      });
    }

    return (
      <div style={{ height: '79vh' }}>
        <h1>Overview for {this.state.employeeFullName}'s registers</h1>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

