// 其他配置
import React, { Component } from 'react';
import {Form, Input, Button, Select, Tooltip, Icon } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {Option} = Select;
const OtherSettings = Form.create()(
    class extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
        }
        render() {
            const { getFieldDecorator } = this.props.form; 
            const { intl } = this.props;
            const formItemLayout = {
                labelCol: {
                    xs: { span: 4 },
                    sm: { span: 4 }
                },
                wrapperCol: {
                    xs: { span: 16 },
                    sm: { span: 16 }
                }
            };
            return (
                <div className={cssObj.otherSettings}>
                    <Form>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_DirectorySecurity'})}
                                colon={false}
                            >
                                {getFieldDecorator('safelevel', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">低</Option>
                                        <Option value="2">中</Option>
                                        <Option value="3">高</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_SortRule'})}
                                colon={false}
                            >
                                {getFieldDecorator('sortRule', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">en_US</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_SortingType'})}
                                colon={false}
                            >
                                {getFieldDecorator('sortMethod', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">Ascending</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_Sortingfield1'})}
                                colon={false}
                            >
                                {getFieldDecorator('sortWord1', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">NULL</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_Sortingfield2'})}
                                colon={false}
                            >
                                {getFieldDecorator('sortWord1', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">NULL</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_Sortingfield3'})}
                                colon={false}
                            >
                                {getFieldDecorator('sortWord1', {
                                    initialValue: '1'
                                })(
                                    <Select>
                                        <Option value="1">NULL</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_passwordTryTimes'})}
                                colon={false}
                            >
                                {getFieldDecorator('passwordTryTimes', {
                                    initialValue:'3'
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_Telepresence'})}
                                colon={false}
                            >
                                {getFieldDecorator('NodeName', {
                                    initialValue:'VC11'
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_ADNodeName'})}
                                colon={false}
                            >
                                {getFieldDecorator('ADnodeName', {
                                    initialValue:''
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_TMSNodeName'})}
                                colon={false}
                            >
                                {getFieldDecorator('TMSnodeName', {
                                    initialValue:''
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_UCNodeName'})}
                                colon={false}
                            >
                                {getFieldDecorator('UCnodeName', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_NTPServer'})}
                                colon={false}
                            >
                                {getFieldDecorator('NTPServe', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_Projectionode'})}
                                colon={false}
                            >
                                {getFieldDecorator('shadowCodeDuring', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_AddressBook'})}
                                colon={false}
                            >
                                {getFieldDecorator('accessAuthor', {
                                    initialValue:''
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem
                                {...formItemLayout}
                                label=" "
                                colon={false}
                            >
                                <div className={cssObj.btnGroup}>
                                    <Button type="primary" htmlType="submit" style={{marginRight:'19px'}}><FormattedMessage id="Save"/></Button>
                                    <Button type="default"><FormattedMessage id=""/></Button>
                                </div>
                            </FormItem>
                        </div>
                    </Form>
                </div>   
            );
        }
    }
);
export default injectIntl(OtherSettings);
