import React, { Component } from 'react';
import {Button} from 'antd';
import styleObj from './MCUDetail.css';
import EditMCUImfo from './EditMCUImfo';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
class MCUBaseInfo extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            display_name:'block',
            display_edit:'none',
            baseInfo:props.baseInfo

        };
       
    }
    
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
   
    handleCancel=(data)=>{
        if(data){
            this.setState({
                baseInfo:data
            })
        }
        this.setState({
            display_edit: 'none', 
            display_name:'block'
        });
    }
   
    render() {
        return(
            <div className={styleObj.mcuBaseInfo}>
                <div  style={{display:this.state.display_name }}>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Name"/></div>
                        <div className={styleObj.wrapperDiv}>{this.state.baseInfo.name}</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AddressIP"/></div>
                        {/* <div className={styleObj.wrapperDiv}>{this.props.baseInfo.mcu.ipAddress}</div> */}
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_Zone"/></div>
                        <div className={styleObj.wrapperDiv}>9660</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ConnectAccount"/></div>
                        <div className={styleObj.wrapperDiv}>10.22.22.22</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_ConnectPassword"/></div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_RegisteSC"/></div>
                        <div className={styleObj.wrapperDiv}>0750</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_MCUMark"/> </div>
                        {/* <div className={styleObj.wrapperDiv}>{this.props.baseInfo.mcu.mcuType}</div> */}
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AdministratorAccount"/></div>
                        <div className={styleObj.wrapperDiv}>加密</div>
                    </div>
               
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="MCU_AdministratorPassword"/></div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}><FormattedMessage id="Edit"/></Button>
                </div>
                <div style={{display:this.state.display_edit}}>
                    {/* onToggleState={this.onChangeState.bind(this)} */}
                    <EditMCUImfo onCancel={this.handleCancel}  data={this.props.baseInfo}></EditMCUImfo>
                </div>
            </div>
        );
    }
}
export default injectIntl(MCUBaseInfo);
