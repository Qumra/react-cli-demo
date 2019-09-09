import React, { Component } from 'react';
import { Button, Input, Form, Tooltip, Icon, Select} from 'antd';
import { withRouter} from 'react-router-dom';
import SelectAreaModal from '../components/SelectAreaModal';
import cssObj from '../add/AddMcu.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const FormItem = Form.Item;
const {Option} = Select;
class EditMCUImfo extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            baseInfo: props.location.state,
            selectAreaModal:false,
            areaId:'',
            hasData: false,
            item:{}
        };
    }
  
    handleSubmit= (e) => {
        let statusCodeSuccess = 200;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let modMcucallback = (res)=>{
                console.log(res.data);
                if (res.status !== statusCodeSuccess) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfo', state:res.data});
    
                }
            };
            if (!err) {
                let ids = this.state._links.self.href.split('/');
                let id = ids[ids.length - 1];
                let mcuMod = {
                    id,
                    name:values.mcuName,
                    mcuType:'CLOUD_MCU',
                    ipAddress:values.IP,
                    serviceZone:{
                        id:this.state.areaId,
                        name:this.state.selectedArea,
                        seryZoneDesc:''
                    }
                };
                csm.registOpCallback('modMcu', modMcucallback);
                csm.modMcu(mcuMod);
            }
        });
    }
    onCancel=()=>{
        this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfo', state:this.props.location.state});
    }
    handleAreaSelector = (selectAreaModal) => {
        this.setState({
            selectAreaModal
        });

    }
    // 显示区域选择的值
    showSelectArea = (selectedKey, selectedId) => {
                
        this.setState({
            selectedArea:selectedKey,
            areaId:selectedId
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl} = this.props;
        // console.log(this.state.baseInfo);
        return (
            <div className={cssObj.AddMCUInfo}>
                
                <Form onSubmit={this.handleSubmit}>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_Name'})}
                            colon={false}
                        >
                            {getFieldDecorator('mcuName', {
                                initialValue: this.state.baseInfo.mcu.name,
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
                                initialValue: this.state.baseInfo.mcu.ipAddress,
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
                                initialValue: this.state.baseInfo.selectedArea,
                                rules: [
                                    { type: 'string', message: 'The input is not valid IP!' },
                                    { required: true, message: 'Please input your IP' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input suffix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)', fontSize: 20, cursor:'pointer'}} onClick={() => this.handleAreaSelector(true)} />}                                
                                    style={{ width: 300 }} placeholder="南京服务区" readOnly
                                />
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
                                initialValue: this.state.baseInfo._links.mcu.href,
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
                            label={intl.formatMessage({id: 'MCU_SNMPAccount'})}
                            colon={false}
                        >
                            {getFieldDecorator('SNMPAccount', {
                                initialValue: this.state.baseInfo.snmpSecurityParam.securityName,
                                rules: [
                                    { type: 'string', message: 'The input is not valid SNMPAccount!' },
                                    { required: true, message: 'Please input your SNMPAccount' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                            )}
                        </FormItem>
                    </div>
                    
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_SNMPAuthenticationProtocol'})}
                            colon={false}
                        >
                            {getFieldDecorator('SNMPAuthenticationProtocol', {
                                initialValue: '1',
                                rules: [
                                    { type: 'string', message: 'The input is not valid SNMPAuthenticationProtocol!' },
                                    { required: true, message: 'Please input your SNMPAuthenticationProtocol' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Select>
                                    <Option value="1">SHA</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_SNMPAuthenticationPassword'})}
                            colon={false}
                        >
                            {getFieldDecorator('SNMPAuthenticationPassword', {
                                initialValue: this.state.baseInfo.snmpSecurityParam.authPasscode,
                                rules: [
                                    { type: 'string', message: 'The input is not valid SNMPAuthenticationPassword!' },
                                    { required: true, message: 'Please input your SNMPAuthenticationPassword' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} type="password"/>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_SNMPEncryptionProtocol'})}
                            colon={false}
                        >
                            {getFieldDecorator('SNMPEncryptionProtocol', {
                                initialValue: '1',
                                rules: [
                                    { type: 'string', message: 'The input is not valid SNMPEncryptionProtocol!' },
                                    { required: true, message: 'Please input your SNMPEncryptionProtocol' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Select>
                                    <Option value="1">SHA</Option>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label={intl.formatMessage({id: 'MCU_SNMPEncryptionPassword'})}
                            colon={false}
                        >
                            {getFieldDecorator('SNMPEncryptionPassword', {
                                initialValue: this.state.baseInfo.snmpSecurityParam.privPasscode,
                                rules: [
                                    { type: 'string', message: 'The input is not valid SNMPEncryptionPassword!' },
                                    { required: true, message: 'Please input your SNMPEncryptionPassword' },
                                    { pattern: '', message: '' }
                                ]
                            })(
                                <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} type="password" />
                            )}
                        </FormItem>
                    </div>
                    <div className={cssObj.tipDiv}>
                        <FormItem
                            label=" "
                            colon={false}
                        >
                            <div className={cssObj.btnGroup}>
                                <Button type="primary" htmlType="submit" onClick={this.handleSubmit}><FormattedMessage id="Save"/></Button>
                                <Button type="default" className={cssObj.cancelBtn} onClick={()=>this.onCancel()}><FormattedMessage id="Cancel"/></Button>
                            </div>
                        </FormItem>
                    </div>
                    <SelectAreaModal selectAreaModal={this.state.selectAreaModal} showSelectArea={this.showSelectArea} handleAreaSelector={this.handleAreaSelector}/>   
                </Form>
            </div>
        );
    }
}
EditMCUImfo = Form.create()(EditMCUImfo);
export default withRouter(injectIntl(EditMCUImfo));
