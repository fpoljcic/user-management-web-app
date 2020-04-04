import React from 'react';
import { Component } from 'react';
import { Input, Col, Row, Modal, Form, Checkbox } from 'antd';
import { Button, DatePicker } from 'antd';
import axios from 'axios';
import { getToken } from '../utilities/Common';
import moment from 'moment';

moment.locale('bs')

const dateFormat = 'DD.MM.YYYY';
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['User Manager', 'Warehouse Manager', 'Public Relations Worker', 'Cashier', 'Bartender'];
const defaultCheckedList = ['User Manager'];

let data = [];
let checkList = defaultCheckedList;

let first = true;

function info() {
    Modal.info({
        title: 'Successful!',
        content: (
            <div>
                <br />
                <p>A new employee has been added successfully.</p>
            </div>
        ),
        onOk() { },
    });
}

function invalid() {
    Modal.info({
        title: 'Invalid input!',
        content: (
            <div>
                <br />
                <p>Please esnure the data you input is valid.</p>
            </div>
        ),
        onOk() { },
    });
}


const roles = ['Admin', 'User Manager', 'Merchant', 'Warehouse Manager', 'Public Relations Worker', 'Cashier', 'Office Manager', 'Bartender'];
function getRoleId(value) {

}

function giveRole(value) {
    switch (value) {

        case 'Warehouse Manager':
            return "ROLE_WAREMAN";

        case 'Public Relations Worker':
            return "ROLE_PRW";

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

let boolName = true;
let boolSurname = true;
let boolAddress = true;
let boolPhone = true;
let boolUsername = true;
let boolPassword = true;
let boolEmail = true;
let boolCountry = true;
let boolCity = true;
let boolJMBG = true;
let boolDate = true;

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {

    let valid = true;
    if (first) return !first;

    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class AddEmployee extends Component {
    constructor(props) {
        super(props);

        this.state = {

            name: '', surname: '', email: '', username: '', password: '', address: '',
            country: '', city: '', phoneNumber: '', jmbg: '', dateOfBirth: '',
            errors: {
                name: '',
                username: '',
                surname: '',
                email: '',
                password: '',
                address: '',
                country: '',
                city: '',
                phoneNumber: '',
                jmbg: '',
                dateOfBirth: ''
            },
            checkedList: data
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (event) => {

        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        first = false;
        this.setState({
            [name]: value
        });
        switch (name) {
            case 'name':
                errors.name =
                    value.length < 2 || boolName
                        ? 'Names must be at least 3 characters long!'
                        : '';
                boolName = false;
                break;
            case 'surname':
                errors.surname =
                    value.length < 2 || boolSurname
                        ? 'Surnames must be at least 3 characters long!'
                        : '';
                boolSurname = false;
                break;

            case 'email':
                errors.email =
                    validEmailRegex.test(value) || boolEmail
                        ? ''
                        : 'Email is not valid!';

                boolEmail = false;
                break;
            case 'password':
                errors.password =
                    value.length < 5 || boolPassword
                        ? 'Passwords must be at least 5 characters long!'
                        : '';
                boolPassword = false;
                break;
            case 'country':
                errors.country =
                    value.length < 3 || boolCountry
                        ? 'Country must contain at least 3 characters!'
                        : '';
                boolCountry = false;
                break;
            case 'city':
                errors.city =
                    value.length < 3 || boolCity
                        ? 'City must contain at least 3 characters!'
                        : '';
                boolCity = false;
                break;
            case 'address':
                errors.address =
                    value.length < 5 || boolAddress
                        ? 'Address must contain at least 5 characters!'
                        : '';
                boolAddress = false;
                break;
            case 'username':
                errors.username =
                    value.length < 5 || boolUsername
                        ? 'Username must contain at least 5 characters!'
                        : '';

                boolUsername = false;
                break;
            case 'phoneNumber':
                errors.phoneNumber =
                    boolPhone || (value.length < 6 || value.match(/^[0-9a-zA-Z]+$/))
                        ? 'Phone number is not valid!'
                        : '';
                boolPhone = false;
                break;
            case 'jmbg':
                errors.jmbg =
                    value.length != 13 || boolJMBG || !value.match(/^[0-9]*$/)
                        ? 'JMBG must contain 13 numbers!'
                        : '';

                boolJMBG = false;
                break;
            case 'dateOfBirth':
                errors.dateOfBirth =
                    boolDate
                        ? 'JMBG must contain 13 numbers!'
                        : '';

                boolDate = false;
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = values => {
        console.log(this.state)
        values.preventDefault();


        if (validateForm(this.state.errors) &&  checkList.length !== 0) {

            console.log(data);


            axios.request({
                method: 'post',
                url: ' https://main-server-si.herokuapp.com/api/auth/register',
                headers: { Authorization: 'Bearer ' + getToken() },
                data: {
                    username: this.state.username,
                    email: this.state.email,
                    name: this.state.name,
                    surname: this.state.surname,
                    address: this.state.address,
                    password: this.state.password,
                    phoneNumber: this.state.phoneNumber,
                    country: this.state.country,
                    city: this.state.city,
                    jmbg: this.state.jmbg,
                    dateOfBirth: this.state.dateOfBirth,
                    roles: data
                }
            })
                .then((response) => {
                    this.props.history.push('/dashboard/home');
                    info()

                }, (error) => {

                    Modal.info({
                        title: 'Invalid input!',
                        content: (
                            <div>
                                <br />
                                <p> New employee with specified information can not be added.</p>
                            </div>
                        ),
                        onOk() { },
                    });
                });

        } else {
            invalid()
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="site-layout-content">

                <div className="site-input-group-wrapper" style={{ marginTop: '2%' }}>
                    <Form handleSubmit={this.handleSubmit}>
                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Form.Item>
                                        <Input name="name" placeholder="Name" onChange={this.handleChange} />
                                        <div className='info' ></div>
                                        {errors.name.length > 0 &&
                                            <span className='error' style={{ color: 'red' }} >{errors.name}</span>}
                                    </Form.Item>
                                </Col>
                                <Col span={7}>
                                    <Form.Item>
                                        <Input name="surname" placeholder="Surname" onChange={this.handleChange} />
                                        <div className='info'></div>
                                        {errors.surname.length > 0 &&
                                            <span className='error' style={{ color: 'red' }} >{errors.surname}</span>}
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Input.Group>

                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Input placeholder="E-mail" name="email" onChange={this.handleChange} />
                                    <div className='info'>
                                        {errors.email.length > 0 &&
                                            <span className='error' style={{ color: 'red' }}>{errors.email}</span>}
                                    </div>

                                </Col>
                                <Col span={7}>
                                    <Input name="phoneNumber" placeholder="Phone number" onChange={this.handleChange} />
                                    {errors.phoneNumber.length > 0 &&
                                        <span className='error' style={{ color: 'red' }}>{errors.phoneNumber}</span>}
                                    <div className='info'>
                                    </div>
                                </Col>
                            </Row>
                        </Input.Group>

                        <br />


                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Input name="jmbg" placeholder="JMBG" onChange={this.handleChange} />
                                    <div className='info'></div>
                                    {errors.jmbg.length > 0 &&
                                        <span className='error' style={{ color: 'red' }} >{errors.jmbg}</span>}
                                </Col>
                                <Col span={7}>

                                    <DatePicker style={{ width: '100%' }} placeholder="Birth date" name="dateOfBirth"
                                        onChange={date => {
                                            this.setState({ dateOfBirth: date.format('DD.MM.YYYY') })
                                        }}
                                    />

                                </Col>
                            </Row>
                        </Input.Group>

                        <br />
                        <br />

                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Input name="username" placeholder="Username" onChange={this.handleChange} />
                                    <div className='info'></div>
                                    {errors.username.length > 0 &&
                                        <span className='error' style={{ color: 'red' }} >{errors.username}</span>}
                                </Col>
                                <Col span={7}>
                                    <Input name="password" placeholder="Password" onChange={this.handleChange} />
                                    {errors.password.length > 0 &&
                                        <span className='error' style={{ color: 'red' }}>{errors.password}</span>}
                                    <div className='info'>
                                    </div>
                                </Col>
                            </Row>
                        </Input.Group>


                        <br />
                        <br />



                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Input name="address" placeholder="Address" onChange={this.handleChange} />
                                    {errors.address.length > 0 &&
                                        <span className='error' style={{ color: 'red' }}>{errors.address}</span>}
                                    <div className='info'>
                                    </div>
                                </Col>
                                <Col span={7}>
                                    <Input name="city" placeholder="City" onChange={this.handleChange} />
                                    {errors.city.length > 0 &&
                                        <span className='error' style={{ color: 'red' }}>{errors.city}</span>}
                                    <div className='info'>
                                    </div>

                                </Col>
                            </Row>
                        </Input.Group>

                        <br />

                        <Input.Group size="large">
                            <Row gutter={10}>
                                <Col span={7}>
                                    <Input name="country" placeholder="Country" onChange={this.handleChange} />
                                    {errors.country.length > 0 &&
                                        <span className='error' style={{ color: 'red' }}>{errors.country}</span>}
                                    <div className='info' >
                                    </div>
                                </Col>
                            </Row>
                        </Input.Group>

                        <br />
                        <br />

                        <MyCheckBox />

                        <br />
                        <br />


                        <div style={{ marginTop: '%' }}>
                            <Button type="primary" style={{ width: '56%' }} onClick={this.handleSubmit} > Submit</Button>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}


export default AddEmployee;


class MyCheckBox extends React.Component {

    state = {
        checkedList: defaultCheckedList,
        indeterminate: true,
        checkAll: false,
    };


    onChange = checkedList => {

        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });

        checkList = checkedList;

        let list = [];
        checkedList.forEach((index) => {
            list.push({ "rolename": giveRole(index) });
        });
        data = list;

        console.log(checkList, checkList.length);
    };

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });


        checkList = e.target.checked ? plainOptions : [];

        let list = [];
        let temp = e.target.checked ? plainOptions : [];
        temp.forEach((index) => {
            list.push({ "rolename": giveRole(index) });
        });
        data = list;
    };

    render() {
        return (
            <div>
                <div className="site-checkbox-all-wrapper" style={{ width: '50%' }}>
                 
                </div>
                <br />
                <CheckboxGroup
                    options={plainOptions}
                    value={this.state.checkedList}
                    onChange={this.onChange}
                />
            </div>
        );
    }
}





