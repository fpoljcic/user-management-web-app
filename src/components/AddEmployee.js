import React from 'react';
import { Component } from 'react';
import { Input, Col, Row, Select, InputNumber, DatePicker, AutoComplete, Cascader, Modal, Form, Checkbox } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import { getToken } from '../utilities/Common';
import { Link } from 'react-router-dom';


const CheckboxGroup = Checkbox.Group;

const plainOptions = ['User Manager', 'Warehouse Manager', 'Public Relations Worker', 'Cashier', 'Bartender'];
const defaultCheckedList = ['User Manager'];

let data = [];

let first = true;

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
            country: '', city: '', phoneNumber: '',
            errors: {
                name: '',
                username: '',
                surname: '',
                email: '',
                password: '',
                address: '',
                country: '',
                city: '',
                phoneNumber: ''
            },
            checkedList: data
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleCheckBox = (event) => {


        console.log("eeeRibo");
    }

    handleChange = (event) => {

        console.log("lo", data);

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
                    value.length < 2
                        ? 'Names must be at least 2 characters long!'
                        : '';
                break;
            case 'surname':
                errors.surname =
                    value.length < 2
                        ? 'Surnames must be at least 2 characters long!'
                        : '';
                break;

            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'password':
                errors.password =
                    value.length < 5
                        ? 'Passwords must be at least 5 characters long!'
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
                    value.length < 5
                        ? 'Address must contain at least 5 characters!'
                        : '';
                break;
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'Username must contain at least 5 characters!'
                        : '';
                break;
            case 'phoneNumber':
                errors.phoneNumber =
                    value.length < 6 || value.match(/^[0-9a-zA-Z]+$/)
                        ? 'Phone number is not valid!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }

    handleSubmit = values => {

        values.preventDefault();

        if (validateForm(this.state.errors)) {

            // POST zahtjev
    }
}

    render() {
        const { errors } = this.state;
        const { username } = this.state.username;
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
                        <br />

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

    };


    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });


    };

    render() {
        return (
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
        );
    }
}





