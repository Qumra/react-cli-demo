import React, { Component } from 'react';
import cssObj from './AddMcu.css';
import { Icon} from 'antd';
import AddMCUInfo from './AddMCUInfo';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
class AddMcu extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
    }
    goback=()=>{
        this.props.history.goBack();
    }
    handleCancel=()=>{
        this.props.history.push({ pathname: '/main/Device/MCUManage' });
    }
    render() {
        return(
            <div className={cssObj.addMcu}>
                <div className={cssObj.mcuContent}>
                    <div className={cssObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={cssObj.leftIcon} onClick={this.goback}/>
                        <span><FormattedMessage id="MCU_AddMCU" /></span>
                        <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                    </div>
                    <div className={cssObj.mcuContentMid}>
                        <div className={cssObj.mcuContentMidpadding}>
                            <AddMCUInfo onCancel={this.handleCancel}></AddMCUInfo>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default injectIntl(AddMcu);
