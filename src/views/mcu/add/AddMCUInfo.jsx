import React, { Component } from 'react';
import { Button, Input, Form, Tooltip, Icon} from 'antd';
import cssObj from './AddMcu.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const { Search } = Input;
class AddMCUInfo extends Component {
    constructor() {
        super();
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {

        };
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        return (
            <div className={cssObj.AddMCUInfo}>
                <Form>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_Name'})}
                            colon={false}
                        >
                            {getFieldDecorator('mcuName', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid mcuName!' },
                                    { required: true, message: 'Please input your mcuName' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_AddressIP'})}
                            colon={false}
                        >
                            {getFieldDecorator('IP', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid IP!' },
                                    { required: true, message: 'Please input your IP' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_Zone'})}
                            colon={false}
                        >
                            {getFieldDecorator('IP', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid IP!' },
                                    { required: true, message: 'Please input your IP' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Search
                                    placeholder="南京服务区"
                                    onSearch={value => console.log(value)}
                                    style={{ width: 300 }}
                                />
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_ConnectAccount'})}
                            colon={false}
                        >
                            {getFieldDecorator('account', {
                                initialValue: 'admin',
                                rules: [
                                    { type: 'string', message: 'The input is not valid account!' },
                                    { required: true, message: 'Please input your account' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_ConnectPassword'})}
                            colon={false}
                        >
                            {getFieldDecorator('password', {
                                initialValue: '123456',
                                rules: [
                                    { type: 'string', message: 'The input is not valid password!' },
                                    { required: true, message: 'Please input your password' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} type="password"/>
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_RegisteSC'})}
                            colon={false}
                        >
                            {getFieldDecorator('SCAdress', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid SCAdress!' },
                                    { required: true, message: 'Please input your SCAdress' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_MCUMark'})}
                            colon={false}
                        >
                            {getFieldDecorator('MCUMark', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid MCUMark!' },
                                    { required: true, message: 'Please input your MCUMark' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_AdministratorAccount'})}
                            colon={false}
                        >
                            {getFieldDecorator('administratorAccount', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid administratorAccount!' },
                                    { required: true, message: 'Please input your administratorAccount' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_AdministratorPassword'})}
                            colon={false}
                        >
                            {getFieldDecorator('administratorPassword', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid administratorPassword!' },
                                    { required: true, message: 'Please input your administratorPassword' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}  type="password"/>
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
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
AddMCUInfo = Form.create()(AddMCUInfo);
export default injectIntl(AddMCUInfo);
