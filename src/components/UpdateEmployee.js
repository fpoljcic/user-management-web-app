import React from 'react';
import { Component } from 'react';
import { Input, Col, Row, Form, Select, InputNumber, DatePicker, AutoComplete, Cascader, Modal } from 'antd';
import { Button } from 'antd';
import axios from 'axios';
import PublicRoute from '../utilities/PublicRoute';
import { getToken } from '../utilities/Common';
 

 
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
                               
                            </Col>
                            <Col span={7}>
                                <Input name="surname" placeholder="Surname" value = {this.state.surname} onChange={this.handleChange} />
                                <div className='info'></div>
                               
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
                                
                                <div className='info'>
                                </div>
                            </Col>
                            <Col span={7}>
                                <Input name="address" placeholder="Address" value = {this.state.address} onChange={this.handleChange} />
                               
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
                               
                                <div className='info'>
                                </div>
 
                            </Col>
                            <Col span={7}>
                                <Input name="country" placeholder="Country" value = {this.state.country} onChange={this.handleChange} />
                               
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
 