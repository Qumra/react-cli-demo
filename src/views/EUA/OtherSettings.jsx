// 其他配置
import React, { Component } from 'react';
import {Form, Input, Button, Select, Tooltip, Icon } from 'antd';
import cssObj from './EUADetail.css';
const FormItem = Form.Item;
const {Option} = Select;
 checkNodeName=(rule, val, callback)=>{
            let reg = /^[<>'"&\\/+-\\]*$/;
            if (!val) {
                callback();
            }else if(!reg.test(val)) {
                callback();
            }else{
                callback(t('node_rule'));
            }
            
        }
const OtherSettings = Form.create()(
    class extends Component {
        render() {
            const { getFieldDecorator } = this.props.form; 
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
                                label="企业通讯录安全等级"
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
                                label="排序规则"
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
                                label="排序方式"
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
                                label="排序字段二"
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
                                label="排序字段三"
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
                                label="密码错误尝试次数"
                            >
                                {getFieldDecorator('passwordTryTimes', {
                                    initialValue:'3'
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="智真节点名称"
                            >
                                {getFieldDecorator('interNodeName', {
                                    initialValue:'VC11'
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="AD节点名称"
                            >
                                {getFieldDecorator('ADnodeName', {
                                    initialValue:''
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="TMS节点名称"
                            >
                                {getFieldDecorator('TMSnodeName', {
                                    initialValue:''
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="UC节点名称"
                            >
                                {getFieldDecorator('UCnodeName', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="NTP服务器"
                            >
                                {getFieldDecorator('NTPServe', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                            <Tooltip title="What do you want others to call you?">
                                <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                            </Tooltip>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="投影码区间"
                            >
                                {getFieldDecorator('shadowCodeDuring', {
                                    initialValue:'000000·999999'
                                })(<Input placeholder="请输入"/>)}
                            </FormItem>
                        </div>
                        <div className={cssObj.tipOtherDiv}>
                            <FormItem 
                                {...formItemLayout}
                                label="通讯录访问权限"
                            >
                                {getFieldDecorator('accessAuthor', {
                                    initialValue:''
                                })(<Input placeholder="请输入IP地址"/>)}
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
                                    <Button type="primary" htmlType="submit" style={{marginRight:'19px'}}>保存</Button>
                                    <Button type="default">取消</Button>
                                </div>
                            </FormItem>
                        </div>
                    </Form>
                </div>   
            );
        }
    }
);
export default OtherSettings;
