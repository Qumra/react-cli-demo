// AD同步配置
import React, { Component } from 'react';
import { Modal, Form, Input, Tooltip, Icon, Button, Switch, Select, InputNumber } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {Option} = Select;
const { TextArea } = Input;
const AddADSynchronizationModal = Form.create()(
    class extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
        }
        onChange=(checked)=>{
            console.log(checked);
        };
        onChangeInputNum=(value)=>{
            console.log('changed', value);
        }
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props;
            const { getFieldDecorator } = form; 
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
                
                <Modal
                    visible={visible}
                    centered
                    title={intl.formatMessage({id: 'EUA_AddModalTitle'})}
                    okText={intl.formatMessage({id: 'Confirm'})}
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key="submit" type="primary" onClick={onCreate}>
                            <FormattedMessage id="Confirm"/>
                        </Button>,
                        <Button key="cancel" onClick={onCancel}><FormattedMessage id="Cancel"/></Button>
                            
                    ]}
                    width="900px"
                >
                    <div className={cssObj.addADConfigModal}>
                        <Form layout="vertical">
                            <Form.Item style={{height:0, paddingBottom:0, marginBottom:'9px'}}>
                                {getFieldDecorator('key', {
                                    initialValue: data.key
                                })(<Input hidden />)}
                            </Form.Item>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_ADName'})}
                                >
                                    {getFieldDecorator('ADName', {
                                        initialValue: data.ADName
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_EnableAD'})}
                                    colon={false}
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('enable', {
                                    })(
                                        <Switch  onChange={this.onChange}/>
                                    )}
                                
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_ServerType'})}
                                >
                                    {getFieldDecorator('serverType', {
                                        initialValue: '1',
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(
                                        <Select>
                                            <Option value="1">AD</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_ADIP'})}
                                >
                                    {getFieldDecorator('ADIP', {
                                        initialValue: data.ADIP,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_ADIPPort'})}
                                >
                                    {getFieldDecorator('ADIPPort', {
                                        initialValue: data.ADIPPort,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_BaseDN'})}
                                >
                                    {getFieldDecorator('baseDN', {
                                        initialValue: data.baseDN,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_AuthAccount'})}
                                >
                                    {getFieldDecorator('account', {
                                        initialValue: data.account,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_ADFilter'})}
                                >
                                    {getFieldDecorator('account', {
                                        initialValue: data.account,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<TextArea  placeholder={intl.formatMessage({id: 'PleaseEnter'})}  className={cssObj.textArea}/>)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_EnableEncryption'})}
                                    colon={false}
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('enablePassword', {
                                    })(
                                        <Switch  onChange={this.onChange}/>
                                    )}
                                
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_AutoSync'})}
                                    colon={false}
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('enableAuto', {
                                    })(
                                        <Switch  onChange={this.onChange}/>
                                    )}
                                
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_NextAutoSync'})}
                                >
                                    {getFieldDecorator('timeNext', {
                                    })(<InputNumber min={1} max={10} placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_SyncMode'})}
                                >
                                    {getFieldDecorator('syncMethod', {
                                        initialValue: '1'
                                    })(
                                        <Select>
                                            <Option value="1">全量同步</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_syncTimeMin'})}
                                >
                                    {getFieldDecorator('syncTimeMin', {
                                        initialValue: data.syncTimeMin,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label={intl.formatMessage({id: 'EUA_syncTimesec'})}
                                >
                                    {getFieldDecorator('syncTimeSec', {
                                        initialValue: data.timeSec,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_ADcertificate'})}
                                    colon={false}
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('enableADCertificate', {
                                    })(
                                        <Switch  onChange={this.onChange}/>
                                    )}
                                
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label={intl.formatMessage({id: 'EUA_ADcertificate'})}
                                    colon={false}
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('enableADCertificateCN', {
                                    })(
                                        <Switch  onChange={this.onChange}/>
                                    )}
                                
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                        </Form>
                    </div>
                </Modal>
               
            );
        }
    }
);
export default injectIntl(AddADSynchronizationModal);
