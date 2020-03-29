import React from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utilities/Common';

class TableEmployee extends React.Component {
  constructor(){
    super();
     this.state = {
      employees: [],
      filteredInfo: null,
      sortedInfo: null,
      empl: [],
    }
  }
  componentWillMount(){
    this.getEmployees();
  }

  getEmployees(){
    axios.get('https://main-server-si.herokuapp.com/api/employees', { headers: { Authorization: 'Bearer '+getToken()}})
      .then(response => {
        this.setState({employees: response.data}, () => {
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
  };

  clearFilters = () => {
    this.setState({ filteredInfo: null });
  };

  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };


  render() {
    let sortedInfo = this.state.sortedInfo;
    let filteredInfo = this.state.filteredInfo;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'surname' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Phone number',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'phoneNumber' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        filters: [
          { text: 'London', value: 'London' },
          { text: 'New York', value: 'New York' },
        ],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
        ellipsis: true,
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.name.includes(value),
        sorter: (a, b) => a.name.length - b.name.length,
        sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
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
