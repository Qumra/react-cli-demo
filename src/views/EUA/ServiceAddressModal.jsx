import React, { Component } from 'react';
import { Modal, Form, Input, Tooltip, Icon } from 'antd';
import cssObj from './EUADetail.css';
const FormItem = Form.Item;
const {confirm} = Modal;
// 定义弹框组件
const ServiceAddressModal =  Form.create()(
    class extends Component {
        render() {
            const { visible, onCancel, onCreate, form, data } = this.props;
            const { getFieldDecorator } = form;
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
                    title="添加终端连接通讯录服务器的地址"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
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
                                label="IP地址"
                            >
                                {getFieldDecorator('IP', {
                                    initialValue: data.IP,
                                    rules: [{ required: true, message: 'Please input the title of collection!' }]
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="LDAP端口"
                            >
                                {getFieldDecorator('LDAP', {
                                    initialValue: data.LDAP,
                                    rules: [{ required: true, message: 'Please input the title of collection!' }]
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipDiv}>
                            <FormItem
                                {...formItemLayout} 
                                label="备注"
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
export default ServiceAddressModal;
