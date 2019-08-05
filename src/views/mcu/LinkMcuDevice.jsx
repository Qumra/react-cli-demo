import React, { Component } from 'react';
import { Button, Input, Form, Radio } from 'antd';
import cssObj from './AddMcu.css';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class LinkMcuDevice extends Component {
    constructor() {
        super();
        this.state = {
            value: 1
        };
    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value
        });
    }
        
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={cssObj.LinkMcuDevice}>
                <Form>
                    <FormItem 
                        label="IP地址"
                        colon={false}
                    >
                        {getFieldDecorator('IP', {
                            rules: [
                                {type: 'string', message: 'The input is not valid IP!'},
                                {required: true, message: 'Please input your IP'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <Input placeholder="请输入"/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="连接搜索方式"
                        colon={false}
                    >
                        {getFieldDecorator('searchMethod', {
                            rules: [
                                {type: 'string', message: 'The input is not valid IP!'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <RadioGroup onChange={this.onChange} value={this.state.value}>
                                <Radio value={1}>SNMP自动</Radio>
                                <Radio value={2}>SNMP V2C</Radio>
                                <Radio value={3}>SNMP V3</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                </Form>
            </div>
        );
    }
}
LinkMcuDevice = Form.create()(LinkMcuDevice);
export default LinkMcuDevice;
