import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import cssObj from './EUADetailFirst.css';
import styleObj from './EUADetail.css';
import ADBaseInfo from './ADBaseInfo';
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
    </Menu>
);
class EUADetail extends Component {
    render() {
        
        return (<div className={cssObj.euaMain}>
            <div className={cssObj.leftNav}>111</div>
            <div className={cssObj.euaContent}>
                <div className={cssObj.euaContentTitle}>
                    <span>企业通讯录管理</span>
                    <div className={styleObj.euaContentTitleMid}>
                        <div className={styleObj.midContent}>
                            <div className={styleObj.status}>
                                <div className={styleObj.greenCircle}></div>
                                <span>已连接</span>
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
                        <div className={styleObj.smcPassword}>
                            <div className={styleObj.smcPasswordIcon}></div>
                            <span className={styleObj.smcPasswordText}>重置SMC访问密码</span>
                        </div>
                        <div className={styleObj.tmsPassword}>
                            <div className={styleObj.smcPasswordIcon}></div>
                            <span className={styleObj.smcPasswordText}>重置TMS访问密码</span>
                        </div>
                        <div className={styleObj.more}>
                            <Dropdown overlay={menu}>
                                <div>
                                    <Icon type="ellipsis" theme="outlined" />更多
                                </div> 
                            </Dropdown>
                        </div>

                    </div>
                    <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>

                </div>
                <div className={cssObj.euaContentMid}>
                    <div className={cssObj.firstLink}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="基本信息" key="1">
                                <ADBaseInfo></ADBaseInfo>
                            </TabPane>
                            <TabPane tab="业务地址" key="2">Content of Tab Pane 2</TabPane>
                            <TabPane tab="AD同步配置" key="3">Content of Tab Pane 3</TabPane>
                            <TabPane tab="共享组织" key="4">Content of Tab Pane 3</TabPane>
                            <TabPane tab="其他配置" key="5">Content of Tab Pane 3</TabPane>
                            <TabPane tab="日志" key="6">Content of Tab Pane 3</TabPane>
                            <TabPane tab="告警" key="7">Content of Tab Pane 3</TabPane>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>);
    }
}
export default EUADetail;
