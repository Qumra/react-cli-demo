import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import cssObj from '../first/EUADetailFirst.css';
import styleObj from './EUADetail.css';
import ADBaseInfo from './ADBaseInfo';
import ServiceAddress from './ServiceAddress';
import ADSynchronization from './ADSynchronization';
import ShareNode from './ShareNode';
import OtherSettings from './OtherSettings';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const {TabPane} = Tabs;
const menu = (
    <Menu>
        <Menu.Item>
            <img src="../view/images/share.png" alt="" className={styleObj.vtsImg}/>
        重置VTS访问密码
        </Menu.Item>
        <Menu.Item>
            <Icon type="setting" theme="outlined" />
            手动全量同步
        </Menu.Item>
        <Menu.Item>
            <Icon type="setting" theme="outlined" />
            重置SMC访问密码
        </Menu.Item>
        <Menu.Item>
            <Icon type="setting" theme="outlined" />
            重置TMS访问密码
        </Menu.Item>
    </Menu>
);
class EUADetail extends Component {
    constructor() {
        super();
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
    }
    render() {
        const { intl } = this.props;
        return (<div className={cssObj.euaMain}>
            <div className={cssObj.euaContent}>
                <div className={cssObj.euaContentTitle}>
                    <FormattedMessage id="EUA_title"/>
                    <div className={styleObj.euaContentTitleMid}>
                        <div className={styleObj.midContent}>
                            <div className={styleObj.status}>
                                <div className={styleObj.greenCircle}></div>
                                <FormattedMessage id="EUA_Connected"/>
                            </div>
                            <div className={styleObj.mainIp}>
                                <div className={styleObj.mainIpIcon}></div>
                                <span>10.22.33.99</span>
                            </div>
                            <div className={styleObj.spareIp}>
                            10.22.33.99
                            </div>
                        </div>
                    </div>
                    <div className={styleObj.euaContentTitleRight}>
                        {/* <div className={styleObj.smcPassword}>
                            <div className={styleObj.smcPasswordIcon}></div>
                            <span className={styleObj.smcPasswordText}>重置SMC访问密码</span>
                        </div>
                        <div className={styleObj.tmsPassword}>
                            <div className={styleObj.smcPasswordIcon}></div>
                            <span className={styleObj.smcPasswordText}>重置TMS访问密码</span>
                        </div> */}
                        <div className={styleObj.manualSync}>
                            <div className={styleObj.manualSyncIcon}></div>
                            <FormattedMessage id="EUA_ManualGlobal" className={styleObj.manualSyncText}/>
                        </div>
                        <div className={styleObj.more}>
                            <Dropdown overlay={menu}>
                                <div>
                                    <Icon type="ellipsis" theme="outlined" />
                                    <FormattedMessage id="More"/>
                                </div> 
                            </Dropdown>
                        </div>

                    </div>
                    <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>

                </div>
                <div className={cssObj.euaContentMid}>
                    <div className={cssObj.firstLink}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab={intl.formatMessage({id: 'BasicInfo'})} key="1">
                                <ADBaseInfo></ADBaseInfo>
                            </TabPane>
                            <TabPane tab={intl.formatMessage({id: 'ServiceAddress'})} key="2">
                                <ServiceAddress></ServiceAddress>
                            </TabPane>
                            <TabPane tab={intl.formatMessage({id: 'ADSynchronization'})} key="3">
                                <ADSynchronization></ADSynchronization>
                            </TabPane>
                            <TabPane tab={intl.formatMessage({id: 'SharedNode'})} key="4">
                                <ShareNode></ShareNode>
                            </TabPane>
                            <TabPane tab={intl.formatMessage({id: 'OtherSettings'})} key="5">
                                <OtherSettings></OtherSettings>
                            </TabPane>
                            <TabPane tab={intl.formatMessage({id: 'Log'})} key="6">Content of Tab Pane 3</TabPane>
                            <TabPane tab={intl.formatMessage({id: 'Alarm'})} key="7">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default injectIntl(EUADetail);
