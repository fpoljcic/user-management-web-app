import React from 'react';
import { Table, Input, Button, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getToken } from '../utilities/Common';


function invalid() {
    Modal.info({
        title: 'Invalid request!',
        content: (
            <div>
                <br />
                <p>The request that was sent was invalid!</p>
            </div>
        ),
        onOk() { },
    });
}

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

        this.changeCurrentWorker = this.changeCurrentWorker.bind(this);
    }

    componentWillMount() {
        this.getEmployees();
        this.getOffices();
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.userID !== prevProps.userID) {
            this.fetchData(this.props.userID);
        }
    }

    odgovarajucaRola(e) {

        let flag = true;

        if (e.roles.size === 0) return false;
        e.roles.forEach(element => {

            if (element.id < 6 || element.id > 8)
                flag = false;
        });
        return flag;
    }


    getEmployees() {
        axios.get('https://main-server-si.herokuapp.com/api/employees', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {

                let filterTest = response.data
                let niz = filterTest.filter(this.odgovarajucaRola);

                this.setState({ employees: niz }, () => {
                })
            })
            .catch(err => console.log(err));
    }

    getOffices() {

        axios.get('https://main-server-si.herokuapp.com/api/business/offices', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {

                console.log("offices", response.data);
                this.setState({ offices: response.data })
            })
            .catch(err => console.log(err));
    }

    hiredRadnici(e, data) {

        let flag = true;
        data.forEach(element => {
            if (element.id === e.id) flag = false;
        });

        return flag;
    }

    changeCurrentWorker(userId) {


        axios.get('https://main-server-si.herokuapp.com/api/business/employees/' + userId + '/office',
            { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {

                let role

                let temp = this.state.employees.find(i => i.userId === userId);
                let pom = temp.roles[0].id

                if (pom === 7) role = "false";
                else role = "true";


                let filterTest = this.state.offices
                let fired = response.data

                console.log(fired);

                let niz = filterTest.filter(e => this.hiredRadnici(e, response.data));


                console.log("hire", niz, response.data);

                this.setState({ fireoffices: response.data, hireoffices: niz, currentWorkerId: userId, currentRole: role })
            })
            .catch(err => {


                invalid()
                this.setState({ hireoffices: null, fireoffices: null })

            }
            );

    };


    hireWorker(office) {

        console.log(this.state.currentRole);

        axios.request({
            method: 'post',
            url: 'https://main-server-si.herokuapp.com/api/business/employees',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: {
                officeId: office,
                employeeId: this.state.currentWorkerId,
                cashier: this.state.currentRole
            }
        })
            .then((response) => {

                this.changeCurrentWorker(this.state.currentWorkerId);
            }, (error) => {

            });

    };

    fireWorker(office) {

        axios.request({
            method: 'delete',
            url: 'https://main-server-si.herokuapp.com/api/business/employees',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: {
                officeId: office,
                employeeId: this.state.currentWorkerId
            }

        }).then(response => {


            this.changeCurrentWorker(this.state.currentWorkerId);

        }).catch((err) => {
            console.log(err)
        })

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

        const columns3 = [
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
                width: '20%',
                ...this.getColumnSearchProps2('address'),
            },
            {
                title: 'City',
                dataIndex: 'city',
                width: '20%',
                key: 'surname',
                ...this.getColumnSearchProps2('city'),
            },
            {
                title: 'Fire',
                dataIndex: 'offices',
                render: (text, record) =>
                    2 >= 1 ? (
                        <Button type="primary" onClick={i => this.fireWorker(record.id)} > Fire </Button>
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

                    <div style={{ width: '44%', float: "left" }}>
                        <h1 style={{ textAlign: "center" }}> Available workplaces</h1>
                        <Table size="small" columns={columns2} dataSource={this.state.hireoffices} />
                    </div>
                    <div style={{ width: '44%', float: "right" }}>
                        <h1 style={{ textAlign: "center" }}> Current workplaces </h1>
                        <Table size="small" columns={columns3} dataSource={this.state.fireoffices} />
                    </div>
                </div>

            </div >
        );
    }
}

export default ManageEmployees;



