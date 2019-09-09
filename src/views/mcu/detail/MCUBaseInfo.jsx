import React, { Component } from 'react';
import {Button} from 'antd';
import styleObj from './MCUDetail.css';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
import TestLinkModel from '../components/TestLinkModel';
import {Link} from 'react-router-dom';
class MCUBaseInfo extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        let ids = this.props.location.state._links.self.href.split('/');
        let id = ids[ids.length - 1];
        console.log(this.props.location.state);
        this.state = {
            baseInfo:this.props.location.state,
            testModel:false,
            hasData: false,
            item:{},
            id
        };
       
    }
    componentWillMount() {//渲染前调用  
        this.getOneMcuDevices();
    }
    
  
    getOneMcuDevices = () => {
        let statusCodeSuccess = 200;
        // 查询服务区的回调
        let requestUrlcallback = (res)=>{
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                // console.log(res.data);
                let info = Object.assign(this.state.item, {serviceZone:res.data});
                console.log(info);
                this.setState({
                    baseInfo:info,
                    hasData: true
                });
            }
        };
        // 查询单个mcu回调
        let querytOneMcucallback = (res) => {
            if (res.status !== statusCodeSuccess) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                // console.log(res.data);
                this.setState({
                    item: res.data
                });
                // 查询服务区
                csm.registOpCallback('requestUrl', requestUrlcallback);
                csm.requestUrl(res.data._links.serviceZone.href);
            }
        };
        csm.registOpCallback('queryOneMcu', querytOneMcucallback);
        csm.queryOneMcu(this.state.id);
    }
    
    testLink=()=>{
        // 测试连接接口
        this.setState({testModel:true});
    }
    showDeleteConfirm = (flag) => {

        if(flag) {
            //后台删除测试连接接口
            // this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfoEdit'});
        }
        this.setState({
            testModel:false            
        });
    }
    render() {
        console.log(this.state.baseInfo);
        return(
            !this.state.hasData ? 'Loading' : (<div className={styleObj.mcuBaseInfo}>
                <div  style={{display:this.state.display_name }}>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Name"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.mcu.name}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AddressIP"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.mcu.ipAddress}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Zone"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.serviceZone.name}</div>
                    </div>
                    
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteSC"/></div>
                        <div className={styleObj.wrapperDiv}>0750</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_MCUMark"/> </div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.mcu.uri}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ConnectAccount"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.mcu.account.name}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ConnectPassword"/></div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SNMPAccount"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.snmpSecurityParam.securityName}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SNMPAuthenticationProtocol"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.snmpSecurityParam.authProto}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SNMPAuthenticationPassword"/></div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SNMPEncryptionProtocol"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.snmpSecurityParam.privProto}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_SNMPEncryptionPassword"/></div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <div>
                        <Button  className={styleObj.editBtn} onClick={()=>{this.setState({testModel:true});}} ><FormattedMessage id="testLinkBtn"/></Button>
                    </div>
                    <Link to={{pathname:'/main/Device/MCUDetail/BasicInfoEdit', state:this.state.baseInfo}}>
                        <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}><FormattedMessage id="Edit"/></Button>
                    </Link>
                </div>
                <TestLinkModel testModel={this.state.testModel} showTestConfirm={this.showTestConfirm}/>
            </div>)
        );
    }
}
export default injectIntl(MCUBaseInfo);
