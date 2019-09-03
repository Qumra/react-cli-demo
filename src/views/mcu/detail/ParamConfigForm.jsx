import React, { Component } from 'react';
import {Form, Switch, Icon, Input, Button, Collapse, Tooltip, Select, message} from 'antd';
import styleObj from './MCUDetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const { Panel } = Collapse;
const FormItem = Form.Item;
const {Option} = Select;
class ParamConfigForm extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
           
        };


    }
    handleSubmit= (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            delete values.registeGK;
            delete values.authenticationPassword;
            delete values.StandbyGK;
            delete values.TrapUserName;
            delete values.TrapAuthenticationProtocol;
            delete values.EngineID;
            delete values.encryptionProtocol;
            delete values.GKIP;
            delete values.SC;
            console.log(values);
            let modMcuConfigcallback = (res)=>{
                if (res.status !== 200) {
                    console.log('请求失败');
                } else {
                    console.log('请求成功');
                    message.info('修改成功');
                    const modData = JSON.parse(res.config.data);
                    this.props.onSwitch(modData.config.items);

                }
            };
            // if (!err) {
            let ids = this.props.baseInfo._links.self.href.split('/');
            let id = ids[ids.length - 1];
            values.Device_ScIsUsedH235 = values.Device_ScIsUsedH235 === true ? '1' : '0';
            values.Device_SipSupport = values.Device_SipSupport === true ? '1' : '0';
            for(let i in values) {
                values[i] = {
                    value:values[i],
                    type:'String'
                };
            }
            let valuesObj = Object.assign(this.props.data, values);
            let mcuModConfig = {
                mcu:{
                    id,
                    ...this.props.baseInfo.mcu
                },
                config:{
                    items:valuesObj
                }
            };
            csm.registOpCallback('editConfig', modMcuConfigcallback);
            csm.editConfig(mcuModConfig);

            // }

        });
    }
    onScIsUsedH235Change=(e)=>{
        console.log(e);
        this.setState({
            ScIsUsedH235:e
        });
    }
    onSipSupportChange=(e)=>{
        console.log(e);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl, onSwitch} = this.props;
        let {data} =  this.props;
        return(
            <div className={styleObj.paramConfigForm}>
                <Form  onSubmit={this.handleSubmit}>
                    <Collapse 
                        defaultActiveKey={['1']}
                        bordered={false}
                    >
                        <Panel header="H.323" key="1">
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label={intl.formatMessage({id: 'MCU_RegisterGK'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('registeGK', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
                                        )}
                                
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_H323ID'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_H323Id', {
                                            initialValue: data.Device_H323Id.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_H323Id!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_SC'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('SC', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SC!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">SC</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_Authpassword'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('authenticationPassword', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid authenticationPassword!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_RASPort'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_ScRasPort', {
                                            initialValue: data.Device_ScRasPort.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid RASPort!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label={intl.formatMessage({id: 'MCU_EnableEncryptionH235'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_ScIsUsedH235', {
                                            valuePropName: 'checked',
                                            initialValue: data.Device_ScIsUsedH235.value !== '0' ? true : false
                                        })(
                                            <Switch  onChange={this.onScIsUsedH235Change} />
                                        )}
                                
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_GKAddress'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('GKIP', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid GKIP!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">200.23.33.33</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_StandbyGK'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('StandbyGK', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid StandbyGK!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">200.23.33.33</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_RegisteStatus'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_ScState', {
                                            initialValue: data.Device_ScState.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_ScState!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">已注册</Option>
                                                <Option value="2">已注册</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            </div>               
                        </Panel>
                        <Panel header="SIP" key="2">
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_LocalPort'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipLocalPort', {
                                            initialValue: data.Device_SipLocalPort.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipLocalPort!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_RegisteIntervalSec'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipFreshRegTimeSpan', {
                                            initialValue: data.Device_SipFreshRegTimeSpan.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipFreshRegTimeSpan!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_AuthUserName'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipDomainUser', {
                                            initialValue: data.Device_SipDomainUser.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipDomainUser!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label={intl.formatMessage({id: 'MCU_RegisteServer'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipSupport', {
                                            valuePropName: 'checked',
                                            initialValue: data.Device_SipSupport.value !== '0' ? true : false
                                        })(
                                            <Switch  onChange={this.onSipSupportChange} />
                                            // defaultChecked
                                        )}
                                
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_ServerAddress'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipAddress', {
                                            initialValue: data.Device_SipAddress.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipAddress!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_ServerPort'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipServerPort', {
                                            initialValue: data.Device_SipServerPort.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipServerPort!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_ServerType'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipType', {
                                            initialValue: data.Device_SipType.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipType!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">标准</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_RegisteRefreshSec'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipReRegTimeSpan', {
                                            initialValue: data.Device_SipReRegTimeSpan.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipReRegTimeSpan!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_SIPURI'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipUri', {
                                            initialValue: data.Device_SipUri.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipUri!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <div className={styleObj.formItem}>
                                        <div className={styleObj.labelDiv}></div>
                                        <div className={styleObj.wrapperDiv}></div>
                                    </div>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_SIPStandbyServer'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipBackUpAddress', {
                                            initialValue: data.Device_SipBackUpAddress.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipBackUpAddress!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_ProtocolType'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SipProtocolType', {
                                            initialValue: data.Device_SipProtocolType.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SipProtocolType!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">TLS</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            </div>               
                        </Panel>
                        <Panel header="ISDN" key="3">
                        </Panel>
                        <Panel header="SNMP" key="4">
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_Location'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpPosition', {
                                            initialValue: data.Device_SnmpPosition.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpPosition!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapTimeoutSec'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_TrapTimeout', {
                                            initialValue: data.Device_TrapTimeout.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_TrapTimeout!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapServerAddress1'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpTrapHostName1', {
                                            initialValue: data.Device_SnmpTrapHostName1.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpTrapHostName1!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapServerAddress3'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpTrapHostName3', {
                                            initialValue: data.Device_SnmpTrapHostName3.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpTrapHostName3!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapServerAddress5'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpTrapHostName5', {
                                            initialValue: data.Device_SnmpTrapHostName5.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpTrapHostName5!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapUserName'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapUserName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapUserName!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapAuthProtocol'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapAuthenticationProtocol', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapAuthenticationProtocol!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">SHA</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_Participant'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpContactPerson', {
                                            initialValue: data.Device_SnmpContactPerson.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpContactPerson!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapRetryTimes'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_TrapTryTimes', {
                                            initialValue: data.Device_TrapTryTimes.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_TrapTryTimes!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapServerAddress2'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpTrapHostName2', {
                                            initialValue: data.Device_SnmpTrapHostName2.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpTrapHostName2!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapServerAddress4'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_SnmpTrapHostName4', {
                                            initialValue: data.Device_SnmpTrapHostName4.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_SnmpTrapHostName4!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <div className={styleObj.formItem}>
                                        <div className={styleObj.labelDiv}></div>
                                        <div className={styleObj.wrapperDiv}></div>
                                    </div>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_EngineID'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('EngineID', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Engine ID!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_TrapEncryption'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('encryptionProtocol', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Engine ID!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                            </div>         
                        </Panel>
                        <Panel header="DNS" key="5">
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_DNSHostName'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_DnsHost', {
                                            initialValue: data.Device_DnsHost.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_DnsHost!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_DNSServerIP'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_DnsAddress1', {
                                            initialValue: data.Device_DnsAddress1.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_DnsAddress1!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_DomainSuffix'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_DnsSuffix', {
                                            initialValue: data.Device_DnsSuffix.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_DnsSuffix!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>   
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_AlternateDNSServer'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('Device_DnsAddress2', {
                                            initialValue: data.Device_DnsAddress2.value,
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Device_DnsAddress2!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder={intl.formatMessage({id: 'PleaseEnter'})} />
                                        )}
                                    </FormItem>
                                </div>        
                            </div>
                        </Panel>
                    </Collapse>
                    <div className={styleObj.btnGroup}>
                        <Button type="primary" htmlType="submit"><FormattedMessage id="Save"/> </Button>
                        <Button type="default" className={styleObj.cancelBtn} onClick={()=>onSwitch()}><FormattedMessage id="Cancel"/></Button>
                    </div>
                </Form>
            </div>
        );
    }
}
ParamConfigForm = Form.create()(ParamConfigForm);
export default injectIntl(ParamConfigForm);
