// AD同步配置
import React, { Component } from 'react';
import { Modal, Form, Input, Tooltip, Icon, Button, Switch, Select, InputNumber } from 'antd';
import cssObj from './EUADetail.css';
const FormItem = Form.Item;
const {Option} = Select;
const { TextArea } = Input;
const AddADSynchronizationModal = Form.create()(
    class extends Component {
        onChange=(checked)=>{
            console.log(checked);
        };
        onChangeInputNum=(value)=>{
            console.log('changed', value);
        }
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
                    title="添加AD源"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCreate}
                    footer={[
                        <Button key="submit" type="primary" onClick={onCreate}>
                          确定
                        </Button>,
                        <Button key="cancel" onClick={onCancel}>取消</Button>
                            
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
                                    label="AD名称"
                                >
                                    {getFieldDecorator('ADName', {
                                        initialValue: data.ADName
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label="启用AD认证"
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
                                    label="服务器类型"
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
                                    label="AD服务器地址"
                                >
                                    {getFieldDecorator('ADIP', {
                                        initialValue: data.ADIP,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="AD服务器端口"
                                >
                                    {getFieldDecorator('ADIPPort', {
                                        initialValue: data.ADIPPort,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="基准DN"
                                >
                                    {getFieldDecorator('baseDN', {
                                        initialValue: data.baseDN,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="认证帐号"
                                >
                                    {getFieldDecorator('account', {
                                        initialValue: data.account,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="AD过滤条件"
                                >
                                    {getFieldDecorator('account', {
                                        initialValue: data.account,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<TextArea  placeholder="请输入"  className={cssObj.textArea}/>)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label="启用加密"
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
                                    label="开启自动同步"
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
                                    label="下次自动同步时间 "
                                >
                                    {getFieldDecorator('timeNext', {
                                    })(<InputNumber min={1} max={10} placeholder="请输入"/>)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="同步方式"
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
                                    label="同步周期(分钟)"
                                >
                                    {getFieldDecorator('syncTimeMin', {
                                        initialValue: data.syncTimeMin,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem
                                    {...formItemLayout}
                                    label="同步周期(秒)"
                                >
                                    {getFieldDecorator('syncTimeSec', {
                                        initialValue: data.timeSec,
                                        rules: [{ required: true, message: 'Please input the title of collection!' }]
                                    })(<Input placeholder="请输入" />)}
                                </FormItem>
                                <Tooltip title="What do you want others to call you?">
                                    <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                                </Tooltip>
                            </div>
                            <div className={cssObj.tipADConfigDiv}>
                                <FormItem 
                                    label="开启校验AD证书"
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
                                    label="开启校验AD证书CN"
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
export default AddADSynchronizationModal;
