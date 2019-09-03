import React, { Component } from 'react';
import {  Button, Collapse } from 'antd';
import styleObj from './MCUDetail.css';
import ParamConfigForm from './ParamConfigForm';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import {Link} from 'react-router-dom';
const { Panel } = Collapse;
class ParamConfig extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            baseInfo:this.props.location.state,
            display_name:'block',
            display_edit:'none',
            id:props.McuId,
            configInfo:'',
            hasData:false,
            configInfoForm:''
        };

    }
    componentWillMount() {//渲染前调用  
        this.getMcuConfig();
    }
    getMcuConfig=()=>{
        let queryConfigCallBack = res => {
            if (res.status !== 200) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                this.setState({
                    configInfo:res.data.items,
                    hasData:true
                });
               
            }
        };
        csm.registOpCallback('queryConfig', queryConfigCallBack);
        csm.queryConfig(this.state.id);
    }
    // 切换是否为编辑状态
    toggleEdit  = ()=>{
        if (this.state.display_name === 'none') {
            this.setState({
                display_name: 'block',
                display_edit:'none'
            });
        } else if (this.state.display_name === 'block') {
            this.setState({
                display_name: 'none',
                display_edit:'block'
            });
        }
    };
    
    handleSwitch=(data)=>{
        if(data) {
            this.setState({
                configInfo:data
            });
        }
        this.setState({
            display_edit: 'none', 
            display_name:'block'
        });
    }
    render() {
        const {baseInfo} = this.props;
        return(
            !this.state.hasData ? 'Loading' : (<div className={styleObj.paramConfig}>
                <div style={{display:this.state.display_name }}>
                  
                    <Collapse 
                        defaultActiveKey={['1']}
                        bordered={false}
                    >
                        <Panel header="H.323" key="1">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}> <FormattedMessage id="MCU_RegisterGK"/></div>
                                    <div className={styleObj.wrapperDiv}>是</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_H323ID"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_H323Id.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SC"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_ScAddress.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Authpassword"/> </div>
                                    <div className={styleObj.wrapperDiv}>****</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RASPort"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_ScRasPort.value}</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_EnableEncryptionH235"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_ScIsUsedH235.value !== '0' ? '是' : '否'}</div>
                                    {/* 选择开关 */}
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_GKAddress"/>  </div>
                                    <div className={styleObj.wrapperDiv}>10.22.22.33</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_StandbyGK"/> </div>
                                    <div className={styleObj.wrapperDiv}>12.22.22.22</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteStatus"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_ScState.value}</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="SIP" key="2">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_LocalPort"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipLocalPort.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteIntervalSec"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipFreshRegTimeSpan.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AuthUserName"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipDomainUser.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteServer"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipSupport.value !== '0' ? '是' : '否'}</div>
                                    {/* 下拉框 */}
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}> <FormattedMessage id="MCU_ServerAddress"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipAddress.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ServerPort"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipServerPort.value}</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ServerType"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipType.value}</div>
                                    {/* 下拉框 */}
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteRefreshSec"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipReRegTimeSpan.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SIPURI"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipUri.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><span></span> </div>
                                    <div className={styleObj.wrapperDiv}></div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SIPStandbyServer"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipBackUpAddress.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ProtocolType"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SipProtocolType.value}</div>
                                    {/* 下拉框 */}
                                </div>
                            </div>
                        </Panel>
                        <Panel header="SNMP" key="3">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Location"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpPosition.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapTimeoutSec"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_TrapTimeout.value}</div>
                                    {/* 下拉框的值 */}
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress1"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpTrapHostName1.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress3"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpTrapHostName3.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress5"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpTrapHostName5.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapUserName"/></div>
                                    <div className={styleObj.wrapperDiv}>trapinit</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapAuthProtocol"/></div>
                                    <div className={styleObj.wrapperDiv}>SHA</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Participant"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpContactPerson.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapRetryTimes"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_TrapTryTimes.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress2"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpTrapHostName2.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress4"/></div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_SnmpTrapHostName4.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><span></span> </div>
                                    <div className={styleObj.wrapperDiv}></div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_EngineID"/> </div>
                                    <div className={styleObj.wrapperDiv}>800039BA38025F9C</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapEncryption"/> </div>
                                    <div className={styleObj.wrapperDiv}>AES</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="DNS" key="4">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_DNSHostName"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_DnsHost.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_DNSServerIP"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_DnsAddress1.value}</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_DomainSuffix"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_DnsSuffix.value}</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AlternateDNSServer"/> </div>
                                    <div className={styleObj.wrapperDiv}>{this.state.configInfo.Device_DnsAddress2.value}</div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                    <Link to={{pathname:'/main/Device/MCUDetail/ParamConfigEdit', state:this.state.baseInfo}}>
                        <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}><FormattedMessage id="Edit"/></Button>
                    </Link>
                </div>
                {/* <div  style={{display:this.state.display_edit}}>
                    <ParamConfigForm onSwitch={this.handleSwitch} data={this.state.configInfo} baseInfo={baseInfo}></ParamConfigForm>
                </div> */}
            </div>)
        );
    }
}
export default injectIntl(ParamConfig);
