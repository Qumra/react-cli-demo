import React, { Component } from 'react';
import {Icon, Tabs, Button } from 'antd';
import cssObj from './EUADetailFirst.css';
import FirstBaseForm from './FirstBaseForm';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const {TabPane} = Tabs;
class EUADetailFirst extends Component {
    constructor() {
        super();
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {
            display_name:'block',
            display_edit:'none'
        };
       
    }
    toLink=()=>{
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
    }
    handleCancel=()=>{
        this.setState({
            display_edit: 'none', 
            display_name:'block'
        });
    }
    render() {
        const { intl } = this.props;
        return (
            <div className={cssObj.euaMain}>
                <div className={cssObj.euaContent}>
                    <div className={cssObj.euaContentTitle}>
                        <span><FormattedMessage id="EUA_title"/></span>
                        <div className={cssObj.status} style={{display:this.state.display_edit }}>
                            <div className={cssObj.statusIcon}></div>
                            <span><FormattedMessage id="EUA_disconnected"/></span>
                        </div>
                        <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                    </div>
                    <div className={cssObj.euaContentMid} >
                        <div className={cssObj.unlink} style={{display:this.state.display_name }}>
                            <img src="" alt="未对接图" className={cssObj.unlinkImg}/>
                            <div className={cssObj.linkButton}>
                                <Button type="primary" onClick={this.toLink}><FormattedMessage id="EUA_ConnectBtn"/></Button>
                            </div>
                            <div className={cssObj.tip}><FormattedMessage id="EUA_disconnectedTip"/></div>
                        </div>
                        <div className={cssObj.firstLink} style={{display:this.state.display_edit }}>
                            <Tabs defaultActiveKey="1" >
                                <TabPane tab={intl.formatMessage({id: 'BasicInfo'})} key="1">
                                    <FirstBaseForm onCancel={this.handleCancel}></FirstBaseForm>
                                </TabPane>
                            </Tabs>
                        </div>
                   
                    </div>
                </div>
            </div>);
    }
}
export default injectIntl(EUADetailFirst);
