import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import styleObj from './MCUDetail.css';
import MCUBaseInfo from './MCUBaseInfo';
const menu = (
    <Menu >
        <Menu.Item key="1">修改链接</Menu.Item>
        <Menu.Item key="2">备份配置</Menu.Item>
        <Menu.Item key="3">恢复配置</Menu.Item>
        <Menu.Item key="4">诊断</Menu.Item>
        <Menu.Item key="5">删除</Menu.Item>
    </Menu>
);
const {TabPane} = Tabs;
class MCUDetail extends Component {
    render() {
        return (
            <div  className={styleObj.mcuMain}>
                <div className={styleObj.mcuContent}>
                    <div className={styleObj.mcuContentTitle}>
                        <span>南京区域MCU详情</span>
                        <div className={styleObj.mcuContentTitleMid}>
                            <div className={styleObj.midContent}>
                                <div className={styleObj.status}>
                                    <div className={styleObj.greenCircle}></div>
                                    <span>在线</span>
                                </div>
                                <div className={styleObj.mcuStatus}>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div  className={styleObj.mcuStatusIcon}></div>
                                </div>
                                <div className={styleObj.mainIp}>
                                    <span>10.22.33.99</span>
                                </div>
                            </div>
                        </div>
                        <div className={styleObj.mcuContentTitleRight}>
                            <div className={styleObj.schedulingDisabled}>
                                <div className={styleObj.schedulingDisabledIcon}></div>
                                <span className={styleObj.schedulingDisabledText}>暂停预约</span>
                            </div>
                            <div className={styleObj.backUpConfiguration}>
                                <div className={styleObj.backUpConfigurationIcon}></div>
                                <span className={styleObj.backUpConfigurationText}>备份配置</span>
                            </div>
                            <div className={styleObj.more}>
                                <Dropdown overlay={menu}>
                                    <div>
                                        <Icon type="ellipsis" theme="outlined" />更多
                                    </div> 
                                </Dropdown>
                            </div>
                        </div>
                        <Icon type="question-circle" theme="outlined" className={styleObj.questionIcon}/>
                    </div> 
                    <div className={styleObj.mcuContentMid}>
                        <div className={styleObj.mcuContentMidpadding}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="基本信息" key="1">
                                    <MCUBaseInfo></MCUBaseInfo>
                                </TabPane>
                                <TabPane tab="参数配置" key="2">
                                Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab="MCU利用率" key="3">
                                Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab="日志" key="4">Content of Tab Pane 3</TabPane>
                                <TabPane tab="告警" key="5">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>   
            </div>
        );
    }
}
export default MCUDetail;
