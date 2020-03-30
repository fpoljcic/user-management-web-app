import React, {Component} from 'react'
import { Table } from 'antd';
import { getToken } from '../utilities/Common';
import axios from 'axios';
 
const columns = [
  {
    title: 'Office ID',
    dataIndex: 'officeId',
  },
  {
    title: 'Cash register ID',
    dataIndex: 'cashRegister',
    sorter: {
        compare: (a, b) => a.cashRegister - b.cashRegister,
        multiple: 1,
      },
  },
  {
    title: 'Manager',
    dataIndex: 'managerId',
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
    axios.get(`https://main-server-si.herokuapp.com/api/business/employees/${employee}/office`, { headers: { Authorization: 'Bearer '+getToken()}})
    .then(response => {
      this.setState({
        office: response.data,
        officeId: response.data.id,
        cashRegisters: response.data.cashRegisters,
        managerId: response.data.manager.id,
      }, (res) => {
        console.log(this.state);
      });
    })
    .catch(err => console.log(err));
  } 
  
  getEmployeeNameFromId () {
    // Make a request for an employee name with a given ID
      const employee = this.props.match.params.id;
      axios.get(`https://main-server-si.herokuapp.com/api/users/${employee}`, { headers: { Authorization: 'Bearer '+getToken()}})
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

    for(let i=0; i<length; i++) {
        data.push({
            officeId: this.state.officeId,
            cashRegister: Object.values(this.state.cashRegisters[i]),
            managerId: this.state.managerId,
        });
    }   
    
    console.log(data);

    return (
      <div style={{height: '75vh'}}>
        <h1>Overview for {this.state.employeeFullName}'s registers</h1>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

