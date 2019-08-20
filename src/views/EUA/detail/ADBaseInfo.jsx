// 基本信息
import React, { Component } from 'react';
import { Button } from 'antd';
import styleObj from './EUADetail.css';
import FirstBaseForm from '../first/FirstBaseForm';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
class ADBaseInfo extends Component {
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
    handleCancel=()=>{
        this.setState({
            display_edit: 'none', 
            display_name:'block'
        });
    }
    render() {
        return (
            <div className={styleObj.baseInfo}>
                <div  style={{display:this.state.display_name }}>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_EnableCorporate"/></div>
                        <div className={styleObj.wrapperDiv}>启用</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_Name"/></div>
                        <div className={styleObj.wrapperDiv}>南京EUA</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_IPAddress"/> </div>
                        <div className={styleObj.wrapperDiv}>10.22.22.33</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_ConnectAccount"/> </div>
                        <div className={styleObj.wrapperDiv}>dddkkk</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_ConnectPassword"/> </div>
                        <div className={styleObj.wrapperDiv}>*******</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><FormattedMessage id="EUA_StandbyDirectory"/> </div>
                        <div className={styleObj.wrapperDiv}>********</div>
                    </div>
                    <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}><FormattedMessage id="Edit"/></Button>
                </div>
                <div style={{display:this.state.display_edit}}>
                    <FirstBaseForm onCancel={this.handleCancel}></FirstBaseForm>
                </div>
            </div>
        );
    }
}
export default injectIntl(ADBaseInfo);
