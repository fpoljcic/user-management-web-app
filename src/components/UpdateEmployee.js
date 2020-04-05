import React from 'react';
import { Component } from 'react';
import { Input, Col, Row, Form, Select, InputNumber, DatePicker, AutoComplete, Cascader, Modal, Checkbox } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import PublicRoute from '../utilities/PublicRoute';
import { getToken } from '../utilities/Common';
const CheckboxGroup = Checkbox.Group;
  
const plainOptions = ['User Manager', 'Warehouse Manager', 'Public Relations Worker', 'Cashier', 'Bartender', 'Customer Support'];
//bartender = 7, merchant = 3, manager = 2, warehouse = 4, pr = 5, cashier =   
let data = [];
let podaci = [];

function giveCheckboxValue(value) {
    switch (value) {

        case "ROLE_WAREMAN":
            return 'Warehouse Manager';

        case "ROLE_PRW":
            return 'Public Relations Worker';
            
        case "ROLE_PRP":
            return 'Customer Support';       
        
        case "ROLE_MANAGER":
            return 'User Manager';
            
        case "ROLE_CASHIER":
            return 'Cashier';
            
        case "ROLE_BARTENDER":
            return 'Bartender';
            
        default:
            return "";
    }

}

function giveRole(value) {
    switch (value) {

        case 'Warehouse Manager':
            return "ROLE_WAREMAN";

        case 'Public Relations Worker':
            return "ROLE_PRW";

        case 'Customer Support':
            return "ROLE_PRP";                

        case 'User Manager':
            return "ROLE_MANAGER";

        case 'Cashier':
            return "ROLE_CASHIER";

        case 'Bartender':
            return "ROLE_BARTENDER";

        default:
            return "";
    }

}

function invalidPR() {
    Modal.info({
        title: 'Invalid update!',
        content: (
            <div>
                <p>Only PR workers can be in Customer Support!</p>
            </div>
        ),
        onOk() { },
    });
}

function invalid() {
    Modal.info({
        title: 'Invalid update!',
        content: (
            <div>
                <p>Values are not valid!</p>
            </div>
        ),
        onOk() { },
    });
}

function invalid1() {
    Modal.info({
        title: 'Server error!',
        content: (
            <div>
                <p> Error in updating employee!</p>
            </div>
        ),
        onOk() { },
    });
}

function invalid2() {
    Modal.info({
        title: 'Server error!',
        content: (
            <div>
                <p> Error in changing roles! Roles didn't change!</p>
            </div>
        ),
        onOk() { },
    });
}

function info() {
    Modal.info({
        title: 'Successful update!',
        content: (
            <div>
                <p></p>
            </div>
        ),
        onOk() { },
    });
}


const validPhoneNumber = RegExp(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g);
const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
 
class UpdateEmployee extends Component {
    state = {
        checkedList:[]
    }
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '', 
            address: '',
            city: '',
            country: '',
            phoneNumber: '',
            roles:[],
            jmbg: '',
            dateOfBirth: '',
            checkedList:[],
            indeterminate: true,
            checkAll: false,
            errors: {
                name: '',
                username: '',
                surname: '',
                email: '',
                password: '',
                username: '',
                address: '',
                country: '',
                city: '',
                phoneNumber: ''
            }
        };
 
        this.handleChange = this.handleChange.bind(this);
    }
 
    componentWillMount(){
        this.getEmployeeDetails();
      }

      getEmployeeDetails(){
        let employee = this.props.match.params.id;
        axios.get(`https://main-server-si.herokuapp.com/api/users/${employee}`, { headers: { Authorization: 'Bearer '+getToken()}})
        .then(response => {
          this.setState({
            name: response.data.name,
            surname: response.data.surname, 
            address: response.data.address,
            city: response.data.city,
            country: response.data.country,
            phoneNumber: response.data.phoneNumber,
            roles: response.data.roles,
            jmbg: response.data.jmbg,
            dateOfBirth: response.data.dateOfBirth,
            checkedList: []
          }, (res) => {
            console.log(response.data);
            for (let i = 0 ; i < this.state.roles.length; i++)
            {
                podaci.push(giveCheckboxValue(this.state.roles[i].rolename));
            }
            this.setState({
                checkedList: podaci
            })
          });
        })
        .catch(err => console.log(err));
        }
    
        editEmployee(newMeetup){
            let employee = this.props.match.params.id;
            axios.request({
              method:'put',
              url:`https://main-server-si.herokuapp.com/api/users/${employee}`,
              headers: { Authorization: 'Bearer '+getToken()},
              data: newMeetup
            }).then(response => {
              this.props.history.push('/dashboard/home');
            }).catch(err => invalid1());
          }

        changeRoles(newRoles) {
            let employee = this.props.match.params.id;
            axios.request({
              method:'put',
              url:`https://main-server-si.herokuapp.com/api/users/roles/${employee}`,
              headers: { Authorization: 'Bearer '+getToken()},
              data: newRoles
            }).then(response => {
              info()
              this.props.history.push('/dashboard/home');
              window.location.reload();
            }).catch(err => invalid2());
        }  


    handleChange = (event) => {
 
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        this.setState({
            [name]: value
        });
        switch (name) {
            case 'name':
                errors.name =
                    value.length < 1
                        ? 'Names must be at least 1 characters long!'
                        : '';
                break;
            case 'surname':
                errors.surname =
                    value.length < 1
                        ? 'Surnames must be at least 1 characters long!'
                        : '';
                break;
            case 'country':
                errors.country =
                    value.length < 3
                        ? 'Country must contain at least 3 characters!'
                        : '';
                break;
            case 'city':
                errors.city =
                    value.length < 3
                        ? 'City must contain at least 3 characters!'
                        : '';
                break;
            case 'address':
                errors.address =
                    value.length < 3
                        ? 'Address must contain at least 3 characters!'
                        : '';
                break;
            case 'phoneNumber':
                errors.phoneNumber =
                    value.length < 12 || validPhoneNumber.test(value)
                        ? 'Phone number is not valid!'
                        : '';
                break;
            default:
                break;
        }
 
        this.setState({ errors, [name]: value });
    }
 
    handleSubmit = (event) => {
        if (this.state.checkedList.length === 0)
        {
            invalid();
        }
        else
        {
            event.preventDefault();
            if (validateForm(this.state.errors)) {
                let zaposlenik = 
                {
                    name: this.state.name,
                    surname: this.state.surname, 
                    address: this.state.address,
                    city: this.state.city,
                    country: this.state.country,
                    phoneNumber: this.state.phoneNumber,
                    roles: this.state.roles,
                    jmbg: this.state.jmbg,
                    dateOfBirth: this.state.dateOfBirth
                }
                this.editEmployee(zaposlenik)
            
                let pomocna = [];
                let postoji = false;
                for (let j = 0; j < this.state.checkedList.length; j++)
                {
                if(j===0)
                pomocna.push({rolename: giveRole(this.state.checkedList[j])});
                
                    
                    else
                    {
                        for (let l = 0; l < pomocna.length; l++)
                        {
                            if (pomocna[l].rolename === (giveRole(this.state.checkedList[j])))
                                {
                                    postoji = true;
                                }
                        }
                        if (postoji == false)
                        {
                            pomocna.push({rolename: giveRole(this.state.checkedList[j])});
                        }
                        else 
                        {
                            postoji = false;
                            continue;
                        }
                    } 
                }
                if(this.state.checkedList.includes("Customer Support") && !this.state.checkedList.includes("Public Relations Worker")) {
                    invalidPR();
                    window.location.reload();
                } else {
                    this.changeRoles({newRoles: pomocna});
                    this.state.checkedList = []
                    this.setState({
                        checkedList: []
                    })
                }             
            }
            else 
            {
                invalid();
            }
        }
    }
    
    handleCancel = (event) => {
        this.props.history.push('/dashboard/home');
        window.location.reload();
    }
      
    onChange = checkedList => {

        this.setState({
            checkedList: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });

        let list = [];
        checkedList.forEach((index) => {
            list.push({ "rolename": giveRole(index) });
        });
        data = list;
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });


        let list = [];
        let temp = e.target.checked ? plainOptions : [];
        temp.forEach((index) => {
            list.push({ "rolename": giveRole(index) });
        });
        data = list;
    };
 
    render() {
        const { errors } = this.state;
        return (
            <div className="site-layout-content">
                
                <Form onSubmit={this.handleSubmit} noValidate> 
                <div className="site-input-group-wrapper" style={{ marginTop: '2%' }}>
 
                    <Input.Group size="large">
                        <Row gutter={10}>
                            <Col span={7}>
                                <Input name="name" placeholder="Name" value = {this.state.name} onChange={this.handleChange} />
                                <div className='info' ></div>
                                {errors.name.length > 0 &&
                                    <span className='error' style={{color: 'red'}} >{errors.name}</span>}
                            </Col>
                            <Col span={7}>
                                <Input name="surname" placeholder="Surname" value = {this.state.surname} onChange={this.handleChange} />
                                <div className='info'></div>
                                {errors.surname.length > 0 &&
                                    <span className='error' style={{color: 'red'}} >{errors.surname}</span>}
                            </Col>
                        </Row>
                    </Input.Group>
                    <br />
 
                    
                    <br />
                    <br />
                    <br />
 
                    <Input.Group size="large">
                        <Row gutter={10}>
                            <Col span={7}>
                                <Input name="phoneNumber" placeholder="Phone number" value = {this.state.phoneNumber} onChange={this.handleChange} />
                                {errors.phoneNumber.length > 0 &&
                                    <span className='error' style={{color: 'red'}}>{errors.phoneNumber}</span>}
                                <div className='info'>
                                </div>
                            </Col>
                            <Col span={7}>
                                <Input name="address" placeholder="Address" value = {this.state.address} onChange={this.handleChange} />
                                {errors.address.length > 0 &&
                                    <span className='error' style={{color: 'red'}}>{errors.address}</span>}
                                <div className='info'>
                                </div>
                            </Col>
                        </Row>
                    </Input.Group>
                    <br />
                    <br />
                    <br />
 
                    <Input.Group size="large">
                        <Row gutter={10}>
                            <Col span={7}>
                                <Input name="city" placeholder="City" value = {this.state.city} onChange={this.handleChange} />
                                {errors.city.length > 0 &&
                                    <span className='error' style={{color: 'red'}}>{errors.city}</span>}
                                <div className='info'>
                                </div>
 
                            </Col>
                            <Col span={7}>
                                <Input name="country" placeholder="Country" value = {this.state.country} onChange={this.handleChange} />
                                {errors.country.length > 0 &&
                                    <span className='error' style={{color: 'red'}}>{errors.country}</span>}
                                <div className='info' >
                                </div>
                            </Col>
                        </Row>
                    </Input.Group>
 
                    <br />
                    <br />
                    <div>
                  
                <div className="site-checkbox-all-wrapper" style={{ width: '50%' }}>

                    <Checkbox

                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
          </Checkbox>

                </div>
                <br />
                <CheckboxGroup
                    options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                />
            </div>
                 
                    <br />
                    <br />             
 
                    <div style={{ marginTop: '%' }}>
                        <Button type="primary" style={{ width: '56%' }} onClick={this.handleSubmit} > Submit</Button>
                        <br />
                        <br /> 
                        <Button type="primary" style={{ width: '56%' }} onClick={this.handleCancel} > Cancel editing</Button>
                    </div>
                </div>
                </Form>
            </div>
        );
    }
}
 
export default UpdateEmployee;
 