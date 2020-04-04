import React, { useState } from 'react';
import { Table, Input, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getToken } from '../utilities/Common';



class ManageEmployees extends React.Component {

    state = {
        offices: null,
        employees: null,
        hireoffices: null,
        fireoffices: null,
        currentWorkerId: null,
        currentRole: "false"
    }

    constructor(props) {
        super(props);

        this.state = {
            searchText1: '',
            searchedColumn1: '',
            selected: null,
            searchText2: '',
            searchedColumn2: '',
        };

    }

 


    getEmployees() {
        
    }

    getOffices() {

    }


    changeCurrentWorker(userId) {

    };


    hireWorker(office) {

           };

   


    getColumnSearchProps1 = dataIndex => ({
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
            this.state.searchedColumn1 === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText1]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });


    getColumnSearchProps2 = dataIndex => ({
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
            this.state.searchedColumn2 === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.state.searchText2]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                    text
                ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
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
        const columns1 = [
            {
                title: 'ID',
                dataIndex: 'userId',
                key: 'userId',
                width: '10%',
                ...this.getColumnSearchProps1('ID'),

            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '20%',
                ...this.getColumnSearchProps1('name'),
            },
            {
                title: 'Surname',
                dataIndex: 'surname',
                width: '20%',
                key: 'surname',
                ...this.getColumnSearchProps1('surname'),
            },
            {
                title: 'Manage',
                dataIndex: 'offices',
                render: (text, record) =>
                    2 >= 1 ? (
                        <Button type="primary" onClick={i => this.changeCurrentWorker(record.userId)} > Office </Button>
                    ) : null,
            }

        ];

        const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                width: '10%',
                ...this.getColumnSearchProps2('ID'),
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: '30%',
                ...this.getColumnSearchProps2('address'),
            },
            {
                title: 'City',
                dataIndex: 'city',
                width: '30%',
                key: 'surname',
                ...this.getColumnSearchProps2('city'),
            },
            {
                title: 'Hire',
                dataIndex: 'offices',
                render: (text, record) =>
                    2 >= 1 ? (
                        <Button type="primary" onClick={i => this.hireWorker(record.id)} > Hire </Button>
                    ) : null,
            }
        ];

        

        return (
            <div>
                <div className="site-layout-content">
                    <div style={{ width: '50%', margin: '0 auto' }}>
                        <h1 style={{ textAlign: "center" }}> Employees</h1>
                        <Table size="small" columns={columns1} dataSource={this.state.employees} />
                    </div>
                    <br />

                    <div style={{ width: '50%', margin: '0 auto' }}>
                        <h1 style={{ textAlign: "center" }}> Available workplaces</h1>
                        <Table size="small" columns={columns2} dataSource={this.state.hireoffices} />
                    </div>
                    
                </div>

            </div >
        );
    }
}

export default ManageEmployees;



