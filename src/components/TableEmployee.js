import React from 'react';
import { Table, Input, Button, Popconfirm } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getToken } from '../utilities/Common';

import Highlighter from 'react-highlight-words';
import moment from 'moment'

const dateFormat = 'DD.MM.YYYY';

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

  handleDeleteRow(userId) {
    let i;
    let rows = [...this.state.employees]
    for (i = 0; i < rows.length; i++)
      if (rows[i].userId == userId) break;

    if (window.confirm('Delete the item?')) {
      this.deleteEmployee(userId, rows[i]);

      rows.splice(i, 1);
      this.setState({
        employees: rows
      });
    }
  };

  deleteEmployee(userId, employeeObject) {

    axios.request({
      method: 'delete',
      url: `https://main-server-si.herokuapp.com/api/employees/${userId}`,
      headers: { Authorization: 'Bearer ' + getToken() },
      data: employeeObject
    }).then(response => {

    }).catch((err) => {
      console.log(err)
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}

          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
          text
        ),

  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {


    console.log(this.state);
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
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
        sorter: (a, b) => a.userId - b.userId,
        sortOrder: sortedInfo.columnKey === 'userId' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('userId')
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        filteredValue: filteredInfo.name || null,
        sorter: (a, b) => { return a.name.localeCompare(b.name) },
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('name')
      },
      {
        title: 'Surname',
        dataIndex: 'surname',
        key: 'surname',
        filteredValue: filteredInfo.surname || null,
        sorter: (a, b) => { return a.surname.localeCompare(b.surname) },
        sortOrder: sortedInfo.columnKey === 'surname' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('surname')
      },
      {
        title: 'JMBG',
        dataIndex: 'jmbg',
        key: 'jmbg',
        filteredValue: filteredInfo.jmbg || null,
        sorter: (a, b) => a.jmbg - b.jmbg,
        sortOrder: sortedInfo.columnKey === 'jmbg' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('jmbg')
      },
      {
        title: 'Birthdate',
        dataIndex: 'dateOfBirth',
        key: 'dateOfBirth',
        filteredValue: filteredInfo.userId || null,
        sorter: (a, b) => moment(a.dateOfBirth, dateFormat).unix() - moment(b.dateOfBirth, dateFormat).unix(),
        sortOrder: sortedInfo.columnKey === 'dateOfBirth' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('dateOfBirth')
      },
      {
        title: 'Email',
        key: 'email',
        dataIndex: 'email',
        filteredValue: filteredInfo.email || null,
        sorter: (a, b) => { return a.email.localeCompare(b.email) },
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('email')
      },
      {
        title: 'Address',
        key: 'address',
        dataIndex: 'address',
        filteredValue: filteredInfo.address || null,
        sorter: (a, b) => { return a.address.localeCompare(b.address) },
        sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('address')
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        filteredValue: filteredInfo.phoneNumber || null,
        sorter: (a, b) => { return a.phoneNumber.localeCompare(b.phoneNumber) },
        sortOrder: sortedInfo.columnKey === 'phoneNumber' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('phoneNumber')
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        filteredValue: filteredInfo.country || null,
        sorter: (a, b) => { return a.country.localeCompare(b.country) },
        sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('country')
      },
      {
        title: 'City',
        dataIndex: 'city',
        key: 'city',
        filteredValue: filteredInfo.city || null,
        sorter: (a, b) => { return a.city.localeCompare(b.city) },
        sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
        ellipsis: true,
        ...this.getColumnSearchProps('city')
      },
      {
        title: 'Edit',
        dataIndex: 'edit',
        render: (text, record) => (
          <Link to={`/dashboard/update_employee/${record.userId}`}>Edit</Link>
        )
      },
      {
        title: 'Delete',
        dataIndex: 'delete',
        render: (text, record) => (
          <Button danger onClick={i => this.handleDeleteRow(record.userId)}>Delete</Button>
        )
      }
    ];
    return (
      <div>
        <Table columns={columns} dataSource={this.state.employees} onChange={this.handleChange} />
        <div className="table-operations" style={{ marginTop: '-48px' }}>
          <Button onClick={this.clearAll}>Clear filters and sorters</Button>
        </div>
      </div>
    );
  }
}

export default TableEmployee;


