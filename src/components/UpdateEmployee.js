import React from 'react';
import { Component } from 'react';
import { Input, Col, Row, Form, Select, InputNumber, DatePicker, AutoComplete, Cascader, Modal } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import PublicRoute from '../utilities/PublicRoute';
import { getToken } from '../utilities/Common';
  

function invalid() {
    Modal.info({
        title: 'Invalid update!',
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
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            surname: '', 
            address: '',
            city: '',
            country: '',
            phoneNumber: '',
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
        event.preventDefault();
        if (validateForm(this.state.errors)) {
           
        } else {
            invalid()
        }
    }
 
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
                    <br />
 
 
                    <div style={{ marginTop: '%' }}>
                        <Button type="primary" style={{ width: '56%' }} onClick={this.handleSubmit} > Submit</Button>
                    </div>
                </div>
                </Form>
            </div>
        );
    }
}
 
 
export default UpdateEmployee;
 