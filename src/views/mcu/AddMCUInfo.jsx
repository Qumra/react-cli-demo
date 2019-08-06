import React, { Component } from 'react';
import { Button, Input, Form, Tooltip, Icon} from 'antd';
import cssObj from './AddMcu.css';
const FormItem = Form.Item;
const { Search } = Input;
class AddMCUInfo extends Component {
    constructor() {
        super();
        this.state = {

        };
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className={cssObj.AddMCUInfo}>
                <Form>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="名称"
                            colon={false}
                        >
                            {getFieldDecorator('mcuName', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid mcuName!' },
                                    { required: true, message: 'Please input your mcuName' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="IP地址"
                            colon={false}
                        >
                            {getFieldDecorator('IP', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid IP!' },
                                    { required: true, message: 'Please input your IP' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="区域"
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
                            label="对接帐号"
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
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="对接密码"
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
                                <Input placeholder="请输入" type="password"/>
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="注册SC地址"
                            colon={false}
                        >
                            {getFieldDecorator('SCAdress', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid SCAdress!' },
                                    { required: true, message: 'Please input your SCAdress' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="MCU标示"
                            colon={false}
                        >
                            {getFieldDecorator('MCUMark', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid MCUMark!' },
                                    { required: true, message: 'Please input your MCUMark' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="管理员帐号"
                            colon={false}
                        >
                            {getFieldDecorator('administratorAccount', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid administratorAccount!' },
                                    { required: true, message: 'Please input your administratorAccount' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                        <Tooltip title="What do you want others to call you?">
                            <Icon type="question-circle-o" className={cssObj.quetionIconModal}/>
                        </Tooltip>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label="管理员密码"
                            colon={false}
                        >
                            {getFieldDecorator('administratorPassword', {
                                rules: [
                                    { type: 'string', message: 'The input is not valid administratorPassword!' },
                                    { required: true, message: 'Please input your administratorPassword' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder="请输入"  type="password"/>
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
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button type="default" className={cssObj.cancelBtn}>取消</Button>
                            </div>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}
AddMCUInfo = Form.create()(AddMCUInfo);
export default AddMCUInfo;
