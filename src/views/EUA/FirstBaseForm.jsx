import React, { Component } from 'react';
import {  Form, Switch, Icon, Input, Tooltip, Button } from 'antd';
import cssObj from './EUADetailFirst.css';
const FormItem = Form.Item;
class FirstBaseForm extends Component {
    onChange=(checked)=>{
        // console.log(checked);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form>
                    <FormItem 
                        label="启用企业通讯录"
                        colon={false}
                    >
                        {getFieldDecorator('enable', {
                        })(
                            <Switch  onChange={this.onChange} defaultChecked/>
                        )}
                                
                    </FormItem>
                    <FormItem 
                        label="名称"
                        colon={false}
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {type: 'string', message: 'The input is not valid name!'},
                                {required: true, message: 'Please input your name'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <Input placeholder="请输入"/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="IP地址"
                        colon={false}
                    >
                        {getFieldDecorator('ipAddress', {
                            rules: [
                                {type: 'string', message: 'The input is not valid ipAddress!'},
                                {required: true, message: 'Please input your ipAddress'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <Input placeholder="请输入"/>
                        )}
                    </FormItem>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label="对接帐号"
                            colon={false}
                        >
                            {getFieldDecorator('account', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid account!'},
                                    {required: true, message: 'Please input your account'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入"/>
                                    
                            )}
                               
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o"  className={cssObj.quetionIconAccount}/>
                        </Tooltip>
                    </div>
                    <FormItem 
                        label="对接密码"
                        colon={false}
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                {type: 'string', message: 'The input is not valid password!'},
                                {required: true, message: 'Please input your password'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <Input placeholder="请输入" type="password"/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="备用通讯录服务器"
                        colon={false}
                    >
                        {getFieldDecorator('standbyIpAddress', {
                            rules: [
                                {type: 'string', message: 'The input is not valid standbyIpAddress!'},
                                {required: true, message: 'Please input your standbyIpAddress'},
                                { pattern:'', message: '' }
                            ]
                        })(
                            <Input   placeholder="请输入IP地址"/>
                        )}
                    </FormItem>
                    <FormItem
                        label=" "
                        colon={false}
                    >
                        <div className={cssObj.btnGroup}>
                            <Button type="primary" htmlType="submit">保存</Button>
                            <Button type="default" className={cssObj.cancelBtn}>取消</Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
            
               
        );
    }
}
FirstBaseForm = Form.create()(FirstBaseForm);
export default FirstBaseForm;
