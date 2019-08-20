import React, { Component } from 'react';
import {Form, Switch, Icon, Input, Button, Collapse, Tooltip, Select} from 'antd';
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
   
    // 取消按钮绑定的事件
    CancelEvent=()=>this.props.onToggleState({
        display_edit: 'none', 
        display_name:'block'
    })
    
    render() {
        const { getFieldDecorator } = this.props.form;
        const { intl } = this.props;
        return(
            <div className={styleObj.paramConfigForm}>
                <Form>
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
                                        {getFieldDecorator('H.323ID', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid H.323ID!' },
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
                                        {getFieldDecorator('RASPort', {
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
                                        {getFieldDecorator('enableH.235', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
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
                                        {getFieldDecorator('registeStatus', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registeStatus!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <span>已注册</span>
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
                                        {getFieldDecorator('localPort', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid localPort!' },
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
                                        {getFieldDecorator('registrationInterval', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registrationInterval!' },
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
                                        {getFieldDecorator('authenticationUserName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid authenticationUserName!' },
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
                                        {getFieldDecorator('registerServer', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
                                        )}
                                
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label={intl.formatMessage({id: 'MCU_ServerAddress'})}
                                        colon={false}
                                    >
                                        {getFieldDecorator('serverIP', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverIP!' },
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
                                        {getFieldDecorator('serverPort', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverIP!' },
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
                                        {getFieldDecorator('serverType', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverType!' },
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
                                        {getFieldDecorator('registrationRefreshInterval', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registrationInterval!' },
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
                                        {getFieldDecorator('SIPURI', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SIPURI!' },
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
                                        {getFieldDecorator('SIPStandbyServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SIPStandbyServerAddress!' },
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
                                        {getFieldDecorator('protocolType', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid protocolType!' },
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
                                        {getFieldDecorator('Location', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Location!' },
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
                                        {getFieldDecorator('TrapTimeoutTime', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapTimeoutTime!' },
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
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress1!' },
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
                                        {getFieldDecorator('TrapServerAddress3', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress3!' },
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
                                        {getFieldDecorator('TrapServerAddress5', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress5!' },
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
                                        {getFieldDecorator('participant', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid participant!' },
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
                                        {getFieldDecorator('TrapAttempts', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapAttempts!' },
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
                                        {getFieldDecorator('TrapServerAddress2', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress2!' },
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
                                        {getFieldDecorator('TrapServerAddress4', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress4!' },
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
                                        {getFieldDecorator('Engine ID', {
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
                                        {getFieldDecorator('DNSHostName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSHostName!' },
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
                                        {getFieldDecorator('DNSServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSServerAddress!' },
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
                                        {getFieldDecorator('DomainNameSuffix', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DomainNameSuffix!' },
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
                                        {getFieldDecorator('DNSStandbyServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSStandbyServerAddress!' },
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
                        <Button type="default" className={styleObj.cancelBtn} onClick={this.CancelEvent}><FormattedMessage id="Cancel"/></Button>
                    </div>
                </Form>
            </div>
        );
    }
}
ParamConfigForm = Form.create()(ParamConfigForm);
export default injectIntl(ParamConfigForm);
