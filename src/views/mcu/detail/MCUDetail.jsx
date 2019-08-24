import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import styleObj from './MCUDetail.css';
import MCUBaseInfo from './MCUBaseInfo';
import ParamConfig from './ParamConfig';
import {zh_CN_Device} from '@/locale/zh_CN';
import {en_US_Device} from '@/locale/en_US';
import {setLocale} from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const menu = (
    <Menu >
        <Menu.Item key="1"> <FormattedMessage id="MCU_ChangeLink"/></Menu.Item>
        <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig"/></Menu.Item>
        <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig"/></Menu.Item>
        <Menu.Item key="4"><FormattedMessage id="MCU_RestoreConfig"/></Menu.Item>
        <Menu.Item key="5"><FormattedMessage id="Delete"/></Menu.Item>
    </Menu>
);
const {TabPane} = Tabs;
class MCUDetail extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        this.state = {...this.props.location.state,
            hasData:false,
            item:{
                // mcu:{
                //     ipAddress: '200.90.238.90',
                //     mcuType: 'CLOUD_MCU',
                //     name: 'testMcu12233'
                // }
            },
            id:''
            
        };
    }
    componentWillMount() {//渲染前调用  
        this.getOneMcuDevices();
    }
    getOneMcuDevices=()=>{
        let querytOneMcucallback = (res)=>{
            console.log(res.data);
            if (res.status !== 200) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                let ids = res.data._links.self.href.split('/');
                let id = ids[ids.length - 1];
                this.setState({
                    item:res.data,
                    id,
                    hasData:true
                });
                console.log(this.state.item);
            }
        };
        csm.registOpCallback('queryOneMcu', querytOneMcucallback);
        csm.queryOneMcu(this.state.key);
    }
    goback=()=>{
        this.props.history.goBack();
    }
    render() {
        const { intl } = this.props;
        return (
            !this.state.hasData ? 'Loading' : (<div  className={styleObj.mcuMain}>
                <div className={styleObj.mcuContent}>
                    <div className={styleObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={styleObj.leftIcon} onClick={this.goback}/>
                        <FormattedMessage id="MCU_Detail" values={{MCUName:this.state.MCUName}}/>
                        <div className={styleObj.mcuContentTitleMid}>
                            <div className={styleObj.midContent}>
                                <div className={styleObj.status}>
                                    <div className={styleObj.greenCircle}></div>
                                    <FormattedMessage id="MCU_Online"/>
                                </div>
                                <div className={styleObj.mcuStatus}>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <Icon type="warning"  style={{color:'#D0021B', marginLeft:'10px'}} />
                                </div>
                                <div className={styleObj.mainIp}>
                                    <span>{this.state.IP}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styleObj.mcuContentTitleRight}>
                            <div className={styleObj.schedulingDisabled}>
                                <div className={styleObj.schedulingDisabledIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_DisScheduling"/>
                            </div>
                            <div className={styleObj.backUpConfiguration}>
                                <div className={styleObj.backUpConfigurationIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_BackUpConfig"/>
                            </div>
                            <div className={styleObj.more}>
                                <Dropdown overlay={menu}>
                                    <div>
                                        <Icon type="ellipsis" theme="outlined" /> <FormattedMessage id="More"/>
                                    </div> 
                                </Dropdown>
                            </div>
                        </div>
                        <Icon type="question-circle" theme="outlined" className={styleObj.questionIcon}/>
                    </div> 
                    <div className={styleObj.mcuContentMid}>
                        <div className={styleObj.mcuContentMidpadding}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={intl.formatMessage({id: 'BasicInfo'})} key="1">
                                    <MCUBaseInfo baseInfo={this.state.item}></MCUBaseInfo>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_ParamConfig'})} key="2">
                                    <ParamConfig  McuId={this.state.id}></ParamConfig>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_UtilizationRatio'})} key="3">
                                Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Alarm'})} key="4">Content of Tab Pane 3</TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Log'})} key="5">Content of Tab Pane 3</TabPane>
                            </Tabs>
                        </div>
                    </div>
                </div>   
            </div>)
        );
    }
}
export default injectIntl(MCUDetail);
