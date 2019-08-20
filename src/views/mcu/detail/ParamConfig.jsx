import React, { Component } from 'react';
import {  Button, Collapse } from 'antd';
import styleObj from './MCUDetail.css';
import ParamConfigForm from './ParamConfigForm';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const { Panel } = Collapse;
class ParamConfig extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            display_name:'block',
            display_edit:'none'
        };

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
    // 改变父组件state里的值
    onChangeState(stateName) {
        this.setState(stateName);
    }
    render() {
        return(
            <div className={styleObj.paramConfig}>
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
                                    <div className={styleObj.wrapperDiv}>223333</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SC"/></div>
                                    <div className={styleObj.wrapperDiv}>19660</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Authpassword"/> </div>
                                    <div className={styleObj.wrapperDiv}>****</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RASPort"/></div>
                                    <div className={styleObj.wrapperDiv}>1718</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_EnableEncryptionH235"/> </div>
                                    <div className={styleObj.wrapperDiv}>1718</div>
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
                                    <div className={styleObj.wrapperDiv}>已注册</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="SIP" key="2">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_LocalPort"/> </div>
                                    <div className={styleObj.wrapperDiv}>5060</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteIntervalSec"/> </div>
                                    <div className={styleObj.wrapperDiv}>30</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AuthUserName"/> </div>
                                    <div className={styleObj.wrapperDiv}></div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteServer"/> </div>
                                    <div className={styleObj.wrapperDiv}>是</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}> <FormattedMessage id="MCU_ServerAddress"/></div>
                                    <div className={styleObj.wrapperDiv}>200.90.34.211</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ServerPort"/> </div>
                                    <div className={styleObj.wrapperDiv}>5061</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ServerType"/></div>
                                    <div className={styleObj.wrapperDiv}>标准</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteRefreshSec"/></div>
                                    <div className={styleObj.wrapperDiv}>300</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SIPURI"/> </div>
                                    <div className={styleObj.wrapperDiv}>0512123118</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><span></span> </div>
                                    <div className={styleObj.wrapperDiv}></div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SIPStandbyServer"/></div>
                                    <div className={styleObj.wrapperDiv}></div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ProtocolType"/></div>
                                    <div className={styleObj.wrapperDiv}>TLS</div>
                                </div>
                            </div>
                        </Panel>
                        <Panel header="SNMP" key="3">
                            <div className={styleObj.leftDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Location"/></div>
                                    <div className={styleObj.wrapperDiv}>HuaWei</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapTimeoutSec"/></div>
                                    <div className={styleObj.wrapperDiv}>5</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress1"/></div>
                                    <div className={styleObj.wrapperDiv}>192.168.10.1</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress3"/></div>
                                    <div className={styleObj.wrapperDiv}>192.168.10.3</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress5"/></div>
                                    <div className={styleObj.wrapperDiv}>192.168.10.5</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapUserName"/></div>
                                    <div className={styleObj.wrapperDiv}>trapinit</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapUserName"/></div>
                                    <div className={styleObj.wrapperDiv}>SHA</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Participant"/></div>
                                    <div className={styleObj.wrapperDiv}>HuaWei</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapRetryTimes"/></div>
                                    <div className={styleObj.wrapperDiv}>3</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress2"/></div>
                                    <div className={styleObj.wrapperDiv}>192.168.10.2</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_TrapServerAddress4"/></div>
                                    <div className={styleObj.wrapperDiv}>192.168.10.4</div>
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
                                    <div className={styleObj.wrapperDiv}>HUAWEI_MCU</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_DNSServerIP"/> </div>
                                    <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                                </div>
                            </div>
                            <div className={styleObj.rightDiv}>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_DomainSuffix"/> </div>
                                    <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                                </div>
                                <div className={styleObj.formItem}>
                                    <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AlternateDNSServer"/> </div>
                                    <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                    <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}><FormattedMessage id="Edit"/></Button>
                </div>
                <div  style={{display:this.state.display_edit}}>
                    <ParamConfigForm onToggleState={this.onChangeState.bind(this)}></ParamConfigForm>
                </div>
            </div>
        );
    }
}
export default injectIntl(ParamConfig);
