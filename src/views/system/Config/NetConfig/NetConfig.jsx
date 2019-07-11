import React, { Component } from "react";
import cssObj from './NetConfig.css'
import { Form, Select, Checkbox, Button, Input, Row, Col } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class NetConfig extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 12 },
                sm: { span: 4 },
            },
        };
        return <div>

            <div className={cssObj.GroupTitle}>目录服务配置</div>
            <Form onSubmit={this.handleSubmit} >
                <FormItem
                    {...formItemLayout}
                    label="启用LDAP"
                >
                    {getFieldDecorator('enableLDAP', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="服务器地址"
                >
                    {getFieldDecorator('serverIPAddress', {
                        initialValue: '',
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your serverIPAddress '
                        },
                        { pattern: '', message: '' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="基准DN"
                >
                    {getFieldDecorator('baseDN', {
                        initialValue: 'CN=users,DC=companyName,DC=com',
                        rules: [{
                            type: 'string',
                        },
                        { pattern: '', message: '' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="用户帐号"
                >
                    {getFieldDecorator('userName', {
                        initialValue: '',
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your userName '
                        },
                        { pattern: '', message: '' }
                        ],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                >
                    {getFieldDecorator('password', {
                        initialValue: '123456',
                        rules: [{
                            type: 'string',
                        }, {
                            required: true, message: 'Please input your password '
                        },
                        { pattern: '', message: '' }
                        ],
                    })(
                        <Input type="password" placeholder="" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="启用LDAPS"
                >
                    {getFieldDecorator('enableLDAPS', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="验证服务端证书的CN"
                >
                    {getFieldDecorator('verifyServerCertificateCN', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                <Row>
                    <Col xs={12} sm={4}></Col>
                    <Col xs={12} sm={4}><Button type="primary" style={{marginBottom:"10px"}}>目录服务配置测试</Button></Col>
                </Row>
                <div className={cssObj.GroupTitle}>外部用户登录配置</div>
                <FormItem
                        {...formItemLayout}
                        label="用户登录类型"
                    >
                        {getFieldDecorator('userLoginType', {
                            initialValue: '1',
                        })(
                            <Select>
                               <Option value="1">不启用</Option>
                               <Option value="2">AD域认证</Option>
                               <Option value="3">CAS SSO单点登录</Option>
                            </Select>
                        )}
                    </FormItem>
                    <div className={cssObj.GroupTitle}>网络地址本配置</div>
                    <FormItem
                    {...formItemLayout}
                    label="启用网络地址本自动更新"
                >
                    {getFieldDecorator('autoUpdateNetworkAddressBook', {
                        valuePropName: 'checked',
                        initialValue: false
                    })(
                        <Checkbox />
                    )}
                </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Tandberg地址本源"
                    >
                        {getFieldDecorator('tandbergAddressBookSource', {
                            initialValue: '1',
                        })(
                            <Select>
                               <Option value="1"></Option>
                            </Select>
                        )}
                        <Col xs={12} sm={4}> <Button type="primary">更新地址本</Button></Col>
                    </FormItem>
                    
            </Form>
            <div className={cssObj.ConfigOperateDiv}>
                <Button type="primary" size="small" onClick={this.handleSubmit} className={cssObj.saveButton}>
                    保存
                </Button>
                <Button type="primary" size="small" className={cssObj.cancleButton}>
                    取消
                </Button>
            </div>
        </div>
    }
}
NetConfig = Form.create()(NetConfig);
export default NetConfig
