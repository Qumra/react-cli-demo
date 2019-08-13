import React, { Component } from 'react';
import { Modal, Form, Input, Tooltip, Icon, Button } from 'antd';
import cssObj from './EUADetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {confirm} = Modal;
// 定义弹框组件
const ServiceAddressModal =  Form.create()(
    class extends Component {
        constructor() {
            super();
            setLocale('zh-CN', zh_CN_Device);
            setLocale('en-US', en_US_Device);
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
                    width="600px"
                    title="添加终端连接通讯录服务器的地址"
                    okText={intl.formatMessage({id: 'Confirm'})}
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key="submit" type="primary" onClick={onCreate}>
                            <FormattedMessage id="Confirm"/>
                        </Button>,
                        <Button key="cancel" onClick={onCancel}><FormattedMessage id="Cancel"/></Button>
                    ]}
                >
                    <Form layout="vertical">
                        <div>业务地址是*********</div>
                        <Form.Item>
                            {getFieldDecorator('key', {
                                initialValue: data.key
                            })(<Input hidden />)}
                        </Form.Item>
                        <div className={cssObj.tipDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_AddressIP'})}
                            >
                                {getFieldDecorator('IP', {
                                    initialValue: data.IP,
                                    rules: [{ required: true, message: 'Please input the title of collection!' }]
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label={intl.formatMessage({id: 'EUA_LDAPPort'})}
                            >
                                {getFieldDecorator('LDAP', {
                                    initialValue: data.LDAP,
                                    rules: [{ required: true, message: 'Please input the title of collection!' }]
                                })(<Input placeholder={intl.formatMessage({id: 'PleaseEnter'})}/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipDiv}>
                            <FormItem
                                {...formItemLayout} 
                                label={intl.formatMessage({id: 'EUA_Remarks'})}
                            >
                                {getFieldDecorator('remarks', {
                                    initialValue: data.remarks
                                })(<Input/>)}
                            </FormItem>
                        </div>
                    </Form>  
                </Modal>
            );
        }
    }
);
export default injectIntl(ServiceAddressModal);
