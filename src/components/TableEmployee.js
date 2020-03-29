import React from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utilities/Common';

import Highlighter from 'react-highlight-words';


class TableEmployee extends React.Component {
  constructor() {
    super();
    this.state = {
      employees: [],
      filteredInfo: null,
      sortedInfo: null,
      empl: [],
      searchText: '',
      searchedColumn: '',
    }
  }
  componentWillMount() {
    this.getEmployees();
  }



  getEmployees() {
    axios.get('https://main-server-si.herokuapp.com/api/employees', { headers: { Authorization: 'Bearer ' + getToken() } })
      .then(response => {
        this.setState({ employees: response.data }, () => {
          console.log(this.state.employees);
        })
      })
      .catch(err => console.log(err));
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
    console.log("lol", this.state);
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      searchText: '' 
    });
  };

  

  render() {
    
    let sortedInfo = this.state.sortedInfo;
    let filteredInfo = this.state.filteredInfo;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'ID',
        dataIndex: 'userId',
        key: 'userId',
        filteredValue: filteredInfo.userId || null,
        ellipsis: true,
     
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filteredValue: filteredInfo.name || null,

        ellipsis: true,
    
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
        filteredValue: filteredInfo.surname || null,
    
        ellipsis: true,
 
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        filteredValue: filteredInfo.email || null,

        ellipsis: true,
       
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address',
        filteredValue: filteredInfo.address || null,
      
        ellipsis: true,
      
      },
      {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',

        ellipsis: true,
   
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        filteredValue: filteredInfo.country || null,
              ellipsis: true,
   
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        filteredValue: filteredInfo.city || null,
     
        ellipsis: true,

      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        render: (text, record) =>
          2 >= 1 ? (
            <Link to={`/dashboard/update_employee/${record.userId}`}> Edit</Link>
          ) : null,
      },
      {
        title: 'Cash register overlook',
        dataIndex: 'Cash register overlook',
        render: (text, record) =>
          2 >= 1 ? (
            <Link to={`/dashboard/cash_register/${record.userId}`}> Overlook</Link>
          ) : null,
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        render: (text, record) =>
          2 >= 1 ? (
            <Link > Delete</Link>
          ) : null,
      }
    ];
    return (
      <div>
        <div className="table-operations">
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
        <Table columns={columns} dataSource={this.state.employees} onChange={this.handleChange} />
      </div>
    );
  }
}

export default TableEmployee;

