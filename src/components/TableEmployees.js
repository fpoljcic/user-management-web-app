import React from 'react';
import { Table, Input, Button, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getToken } from '../utilities/Common';
import moment from 'moment'


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
        currentRole: "false",
        managers: null
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
        this.getManagers();
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
    getManagers() {
        axios.get('https://main-server-si.herokuapp.com/api/employees', { headers: { Authorization: 'Bearer ' + getToken() } })
            .then(response => {
                let niz = response.data.filter((entry) => {
                    return entry.roles.some(item => item.rolename === "ROLE_OFFICEMAN");
                })
                this.setState({ managers: niz }, () => {
                    console.log("managers", this.state.managers);
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

    isOffMan(userId) {
        return this.state.managers.some(e => e.userId === userId);
    }

    changeCurrentWorker(userId) {

        if (this.isOffMan(userId)) {
            console.log("provjera offman");

            // Office managera ne mozemo zaposliti, ali mozemo otpustiti
            let niz = this.state.offices.filter(e => e.manager.id === userId);
            this.setState({ hireoffices: null, fireoffices: niz, currentWorkerId: userId });
        }
        else {

            axios.get('https://main-server-si.herokuapp.com/api/business/employees/' + userId + '/office',
                { headers: { Authorization: 'Bearer ' + getToken() } })
                .then(response => {

                    let role

                    let temp = this.state.employees.find(i => i.userId === userId);
                    let pom = temp.roles[0].id

                    if (pom === 7) role = "false";
                    else role = "true";

                    let filterTest = this.state.offices

                    let niz = filterTest.filter(e => this.hiredRadnici(e, response.data));

                    this.setState({ fireoffices: response.data, hireoffices: niz, currentWorkerId: userId, currentRole: role })
                })
                .catch(err => {
                    if ("Employee with this id isn't hired at any office" === err.response.data.message) {

                        let role

                        let temp = this.state.employees.find(i => i.userId === userId);
                        let pom = temp.roles[0].id

                        if (pom === 7) role = "false";
                        else role = "true";

                        this.setState({ hireoffices: this.state.offices, fireoffices: null, currentRole: role, currentWorkerId: userId })
                    }
                    else {

                        invalid()
                        this.setState({ hireoffices: null, fireoffices: null })
                    }

                }
                );
        }

    };


    hireWorker(office) {

        console.log(this.state.currentRole);
        //Zahtjev i za automatsko slanje notifikacije
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

                this.sendNotification("true");
                this.changeCurrentWorker(this.state.currentWorkerId);
            }, (error) => {

            });

    };

    fireWorker(office) {
         //Zahtjev i za automatsko slanje notifikacije
        axios.request({
            method: 'delete',
            url: 'https://main-server-si.herokuapp.com/api/business/employees',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: {
                officeId: office,
                employeeId: this.state.currentWorkerId
            }

        }).then(response => {

            this.sendNotification("false");
            this.changeCurrentWorker(this.state.currentWorkerId);

        }).catch((err) => {
            console.log(err)
        })

    };

     sendNotification(hired) {
        axios.request({
            method: 'post',
            url: 'https://main-server-si.herokuapp.com/api/notifications/send',
            headers: { Authorization: 'Bearer ' + getToken() },
            data: {
                employeeId: this.state.currentWorkerId,
                hired: hired,
                date: moment().format('DD.MM.YYYY'),
                time: moment().format('HH:MM') 
            }
        })
            .then((response) => {
            }, (error) => {

            });
    }


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
                width: '15%',
                ...this.getColumnSearchProps1('ID'),

            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps1('name'),
            },
            {
                title: 'Surname',
                dataIndex: 'surname',
                width: '30%',
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
                title: 'Unassign',
                dataIndex: 'offices',
                render: (text, record) =>
                    2 >= 1 ? (
                        <Button type="primary" onClick={i => this.fireWorker(record.id)} > Unassign </Button>
                    ) : null,
            }
        ];

        return (
            <div class = "wrap">
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