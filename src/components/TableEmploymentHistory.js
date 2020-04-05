import React from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';
import { getToken } from '../utilities/Common';

//import Title from 'antd/lib/skeleton/Title';
const { Title } = Typography;

class TableEmploymentHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeeProfileResponse: '',
            officeHistories: []
        }
    }

    componentWillMount(){
        this.getEmploymentHistory();
    }

    getEmploymentHistory() {
        let userId = this.props.match.params.id;
        axios.get(`https://main-server-si.herokuapp.com/api/business/employees/${userId}/history`, { headers: { Authorization: 'Bearer ' + getToken()}})
          .then(response => {
            this.setState({ 
                employeeProfileResponse: response.data.employeeProfileResponse,
                officeHistories: response.data.officeHistories
            }, () => {
                console.log(response.data);
            })
          })
          .catch(err => console.log(err));
    }

    render() {

        const columns = [
            {
                title: 'Office response',
                dataIndex: 'officeResponse'
                
            },
            {
                title: 'Start date',
                dataIndex: 'startDate'
                
            },
            {
                title: 'End date',
                dataIndex: 'endDate'
                
            },
            {
                title: 'Role',
                dataIndex: 'role'
                
            }

        ]
        return (
            <div>
                <div className= "site-layout-content">
                    <Title level={3}> {this.state.employeeProfileResponse.id} {this.state.employeeProfileResponse.name} {this.state.employeeProfileResponse.surname}</Title>
                </div>
                <div>
                    <Table columns={columns} dataSource={this.state.officeHistories} />
                    <div className="table-operations" style={{ marginTop: '-48px' }}>
                        
                    </div>
                </div>
            </div>
            
            
        );
    }
}

export default TableEmploymentHistory;