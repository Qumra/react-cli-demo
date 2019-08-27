import React, { Component } from 'react';
import { Button, Input, Form, Tooltip, Icon} from 'antd';
import { NavLink, withRouter} from 'react-router-dom';
import cssObj from '../add/AddMcu.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const { Search } = Input;

class EditMCUImfo extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {

        };
    }
    handleSubmit= (e) => {
        e.preventDefault();
        // debugger;
        // let ids = this.props.data._links.self.href.split('/');
        // let id = ids[ids.length - 1];
        // let mcuMod = {
        //     id,
        //     name:'testMcu1223333333333333',
        //     mcuType:'CLOUD_MCU',
        //     ipAddress:'200.90.238.90'
        //     // account:{
        //     //     name:'fb',
        //     //     password:'Change_Me',
        //     //    roles:['ROLE_USER']
        //     // }
        // };
        // let modMcucallback = (res)=>{
        //     console.log(res);
        //     if (res.status !== 200) {
        //         console.log('请求失败');
        //     } else {
        //         console.log('请求成功');
        //         // this.props.history.push({pathname:'/main/Device/MCUDetail', state:res.data});
        //         this.props.onSwitch(res.data);

        //     }
        // };
        // csm.registOpCallback('modMcu', modMcucallback);
        // csm.modMcu(mcuMod);

        this.props.form.validateFields((err, values) => {
            let modMcucallback = (res)=>{
                console.log(res);
                if (res.status !== 200) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    this.props.onSwitch(res.data);
    
                }
            };
            if (!err) {
                let ids = this.props.data._links.self.href.split('/');
                let id = ids[ids.length - 1];
                let mcuMod = {
                    id,
                    name:values.mcuName,
                    mcuType:'CLOUD_MCU',
                    ipAddress:values.IP
                };
                csm.registOpCallback('modMcu', modMcucallback);
                csm.modMcu(mcuMod);
            }
        });
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl, onSwitch} = this.props;
        let {data} = this.props;
        return (
            <div className={cssObj.AddMCUInfo}>
                
                <Form onSubmit={this.handleSubmit}>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_Name'})}
                            colon={false}
                        >
                            {getFieldDecorator('mcuName', {
                                initialValue: data.mcu.name,
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
                                initialValue: data.mcu.ipAddress,
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
                            {getFieldDecorator('Zone', {
                                // initialValue: data._link.Zone,
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
                                initialValue: data._links.mcu.href,
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
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}><FormattedMessage id="Save"/></Button>
                                <Button type="default" className={cssObj.cancelBtn} onClick={onSwitch}><FormattedMessage id="Cancel"/></Button>
                            </div>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}
EditMCUImfo = Form.create()(EditMCUImfo);
export default withRouter(injectIntl(EditMCUImfo));
