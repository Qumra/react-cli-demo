import React, { Component } from 'react';
import {  Form, Switch, Icon, Input, Tooltip, Button } from 'antd';
import cssObj from './EUADetailFirst.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
class FirstBaseForm extends Component {
    constructor() {
        super();
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
    }
    onChange=(checked)=>{
        // console.log(checked);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        return (
            <div className={cssObj.firstBaseForm}>
                <Form>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_EnableCorporate'})}
                            colon={false}
                        >
                            {getFieldDecorator('enable', {
                            })(
                                <Switch  onChange={this.onChange} defaultChecked/>
                            )}
                                
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_Name'})}
                            colon={false}
                        >
                            {getFieldDecorator('name', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid name!'},
                                    {required: true, message: 'Please input your name'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_IPAddress'})}
                            colon={false}
                        >
                            {getFieldDecorator('ipAddress', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid ipAddress!'},
                                    {required: true, message: 'Please input your ipAddress'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_ConnectAccount'})}
                            colon={false}
                        >
                            {getFieldDecorator('account', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid account!'},
                                    {required: true, message: 'Please input your account'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>
                                    
                            )}
                               
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o"  className={cssObj.quetionIconAccount}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_ConnectPassword'})}
                            colon={false}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid password!'},
                                    {required: true, message: 'Please input your password'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} type="password"/>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem 
                            label={intl.formatMessage({id: 'EUA_StandbyDirectory'})}
                            colon={false}
                        >
                            {getFieldDecorator('standbyIpAddress', {
                                rules: [
                                    {type: 'string', message: 'The input is not valid standbyIpAddress!'},
                                    {required: true, message: 'Please input your standbyIpAddress'},
                                    { pattern:'', message: '' }
                                ]
                            })(
                                <Input   placeholder={intl.formatMessage({id: 'PleaseEnterIP'})}/>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label=" "
                            colon={false}
                        >
                            <div className={cssObj.btnGroup}>
                                <Button type="primary" htmlType="submit"><FormattedMessage id="Save"/></Button>
                                <Button type="default" className={cssObj.cancelBtn}><FormattedMessage id="Cancel"/></Button>
                            </div>
                        </FormItem>
                    </div>
                </Form>
            </div>
            
               
        );
    }
}
FirstBaseForm = Form.create()(FirstBaseForm);
export default injectIntl(FirstBaseForm);
