import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import { menu_Device_MCUManage_Details } from '@/commonJS/common';
import styleObj from './MCUDetail.css';
import { Route, NavLink} from 'react-router-dom';
import MCUBaseInfo from './MCUBaseInfo';
import ParamConfig from './ParamConfig';
import ParamConfigForm from './ParamConfigForm';
import EditMCUImfo from './EditMCUImfo';
import { zh_CN_Device } from '@/locale/zh_CN';
import { en_US_Device } from '@/locale/en_US';
import { setLocale } from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const menu = (
    <Menu >
        <Menu.Item key="1"> <FormattedMessage id="MCU_ChangeLink" /></Menu.Item>
        <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig" /></Menu.Item>
        <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
        <Menu.Item key="4"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
        <Menu.Item key="5"><FormattedMessage id="Delete" /></Menu.Item>
    </Menu>
);
const { TabPane } = Tabs;
let match = '';
class MCUDetail extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        match = props.match;
        this.state = {
            ...this.props.location.state,
            hasData: false,
            currentMenu: '/main/Device/MCUDetail/BasicInfo',
            menus: menu_Device_MCUManage_Details,
            item: {},
            id: ''

        };
    }
    componentWillMount() {//渲染前调用  
        this.getOneMcuDevices();
    }
    getOneMcuDevices = () => {
        let querytOneMcucallback = (res) => {
            if (res.status !== 200) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                console.log(res.data);
                let ids = res.data._links.self.href.split('/');
                let id = ids[ids.length - 1];
                this.setState({
                    item: res.data,
                    id,
                    hasData: true
                });
                this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfo', state:res.data});
            }
        };
        csm.registOpCallback('queryOneMcu', querytOneMcucallback);
        csm.queryOneMcu(this.state.key);
    }
    goback = () => {
        this.props.history.goBack();
    }
    renderMenuItem = ({ key, icon }, data) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={{pathname:key, state:data}}>
                    {icon && <Icon type={icon} />}
                    <FormattedMessage id={key.split('/').filter(i => i).pop()} />
                </NavLink>
            </Menu.Item>
        );
    }
    render() {
        const { intl } = this.props;
        return (
            !this.state.hasData ? 'Loading' : (<div className={styleObj.mcuMain}>
                <div className={styleObj.mcuContent}>
                    <div className={styleObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={styleObj.leftIcon} onClick={this.goback} />
                        <FormattedMessage id="MCU_Detail" values={{ MCUName: this.state.MCUName }} />
                        <div className={styleObj.mcuContentTitleMid}>
                            <div className={styleObj.midContent}>
                                <div className={styleObj.status}>
                                    <div className={styleObj.greenCircle}></div>
                                    <FormattedMessage id="MCU_Online" />
                                </div>
                                <div className={styleObj.mcuStatus}>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <Icon type="warning" style={{ color: '#D0021B', marginLeft: '10px' }} />
                                </div>
                                <div className={styleObj.mainIp}>
                                    <span>{this.state.IP}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styleObj.mcuContentTitleRight}>
                            <div className={styleObj.schedulingDisabled}>
                                <div className={styleObj.schedulingDisabledIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_DisScheduling" />
                            </div>
                            <div className={styleObj.backUpConfiguration}>
                                <div className={styleObj.backUpConfigurationIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_BackUpConfig" />
                            </div>
                            <div className={styleObj.more}>
                                <Dropdown overlay={menu}>
                                    <div>
                                        <Icon type="ellipsis" theme="outlined" /> <FormattedMessage id="More" />
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <Icon type="question-circle" theme="outlined" className={styleObj.questionIcon} />
                    </div>
                    <div className={styleObj.mcuContentMid}>
                        <div className={styleObj.mcuContentMidpadding}>
                            {/* <Tabs defaultActiveKey="1">
                                <TabPane tab={intl.formatMessage({id: 'BasicInfo'})} key="1">
                                    <MCUBaseInfo baseInfo={this.state.item}></MCUBaseInfo>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_ParamConfig'})} key="2">
                                    <ParamConfig  McuId={this.state.id} baseInfo={this.state.item}></ParamConfig>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_UtilizationRatio'})} key="3">
                                Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Alarm'})} key="4">Content of Tab Pane 3</TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Log'})} key="5">Content of Tab Pane 3</TabPane>
                            </Tabs> */}
                            <div style={{ width: '100%', height: '50px' }}>

                                <div>
                                    <Menu defaultSelectedKeys={[this.state.currentMenu]} mode="horizontal" onClick={(e) => { this.setState({ currentMenu: e.key }); }}>
                                        {
                                            this.state.menus.map(item => {
                                                return this.renderMenuItem(item, this.state.item);
                                            })
                                        }
                                    </Menu>
                                </div>
                            </div>
                            <div style={{height:'90%'}}>
                                <Route  path={`${match.url}/BasicInfo`} component={MCUBaseInfo}></Route>
                                <Route  path={`${match.url}/ParamConfig`} component={ParamConfig}></Route>
                                <Route  path={`${match.url}/UtilizationRatio`} component={null}></Route>
                                <Route  path={`${match.url}/BasicInfoEdit`} component={EditMCUImfo}></Route>
                                <Route  path={`${match.url}/ParamConfigEdit`} component={ParamConfigForm}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        );
    }
}
export default injectIntl(MCUDetail);import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Tabs } from 'antd';
import { menu_Device_MCUManage_Details } from '@/commonJS/common';
import styleObj from './MCUDetail.css';
import { Route, NavLink} from 'react-router-dom';
import MCUBaseInfo from './MCUBaseInfo';
import ParamConfig from './ParamConfig';
import ParamConfigForm from './ParamConfigForm';
import EditMCUImfo from './EditMCUImfo';
import { zh_CN_Device } from '@/locale/zh_CN';
import { en_US_Device } from '@/locale/en_US';
import { setLocale } from '@/config/i18n';
import { FormattedMessage, injectIntl } from 'react-intl';
const menu = (
    <Menu >
        <Menu.Item key="1"> <FormattedMessage id="MCU_ChangeLink" /></Menu.Item>
        <Menu.Item key="2"><FormattedMessage id="MCU_BackUpConfig" /></Menu.Item>
        <Menu.Item key="3"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
        <Menu.Item key="4"><FormattedMessage id="MCU_RestoreConfig" /></Menu.Item>
        <Menu.Item key="5"><FormattedMessage id="Delete" /></Menu.Item>
    </Menu>
);
const { TabPane } = Tabs;
let match = '';
class MCUDetail extends Component {
    constructor(props) {
        super(props);
        setLocale('zh-CN', zh_CN_Device);
        setLocale('en-US', en_US_Device);
        match = props.match;
        this.state = {
            ...this.props.location.state,
            hasData: false,
            currentMenu: '/main/Device/MCUDetail/BasicInfo',
            menus: menu_Device_MCUManage_Details,
            item: {},
            id: ''

        };
    }
    componentWillMount() {//渲染前调用  
        this.getOneMcuDevices();
    }
    getOneMcuDevices = () => {
        let querytOneMcucallback = (res) => {
            if (res.status !== 200) {
                console.log('请求失败');
            } else {
                console.log('请求成功');
                console.log(res.data);
                let ids = res.data._links.self.href.split('/');
                let id = ids[ids.length - 1];
                this.setState({
                    item: res.data,
                    id,
                    hasData: true
                });
                this.props.history.push({pathname:'/main/Device/MCUDetail/BasicInfo', state:res.data});
            }
        };
        csm.registOpCallback('queryOneMcu', querytOneMcucallback);
        csm.queryOneMcu(this.state.key);
    }
    goback = () => {
        this.props.history.goBack();
    }
    renderMenuItem = ({ key, icon }, data) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={{pathname:key, state:data}}>
                    {icon && <Icon type={icon} />}
                    <FormattedMessage id={key.split('/').filter(i => i).pop()} />
                </NavLink>
            </Menu.Item>
        );
    }
    render() {
        const { intl } = this.props;
        return (
            !this.state.hasData ? 'Loading' : (<div className={styleObj.mcuMain}>
                <div className={styleObj.mcuContent}>
                    <div className={styleObj.mcuContentTitle}>
                        <Icon type="left-circle" theme="outlined" className={styleObj.leftIcon} onClick={this.goback} />
                        <FormattedMessage id="MCU_Detail" values={{ MCUName: this.state.MCUName }} />
                        <div className={styleObj.mcuContentTitleMid}>
                            <div className={styleObj.midContent}>
                                <div className={styleObj.status}>
                                    <div className={styleObj.greenCircle}></div>
                                    <FormattedMessage id="MCU_Online" />
                                </div>
                                <div className={styleObj.mcuStatus}>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <div className={styleObj.mcuStatusIcon}></div>
                                    <Icon type="warning" style={{ color: '#D0021B', marginLeft: '10px' }} />
                                </div>
                                <div className={styleObj.mainIp}>
                                    <span>{this.state.IP}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styleObj.mcuContentTitleRight}>
                            <div className={styleObj.schedulingDisabled}>
                                <div className={styleObj.schedulingDisabledIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_DisScheduling" />
                            </div>
                            <div className={styleObj.backUpConfiguration}>
                                <div className={styleObj.backUpConfigurationIcon}></div>
                                <FormattedMessage className={styleObj.schedulingDisabledText} id="MCU_BackUpConfig" />
                            </div>
                            <div className={styleObj.more}>
                                <Dropdown overlay={menu}>
                                    <div>
                                        <Icon type="ellipsis" theme="outlined" /> <FormattedMessage id="More" />
                                    </div>
                                </Dropdown>
                            </div>
                        </div>
                        <Icon type="question-circle" theme="outlined" className={styleObj.questionIcon} />
                    </div>
                    <div className={styleObj.mcuContentMid}>
                        <div className={styleObj.mcuContentMidpadding}>
                            {/* <Tabs defaultActiveKey="1">
                                <TabPane tab={intl.formatMessage({id: 'BasicInfo'})} key="1">
                                    <MCUBaseInfo baseInfo={this.state.item}></MCUBaseInfo>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_ParamConfig'})} key="2">
                                    <ParamConfig  McuId={this.state.id} baseInfo={this.state.item}></ParamConfig>
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'MCU_UtilizationRatio'})} key="3">
                                Content of Tab Pane 3
                                </TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Alarm'})} key="4">Content of Tab Pane 3</TabPane>
                                <TabPane tab={intl.formatMessage({id: 'Log'})} key="5">Content of Tab Pane 3</TabPane>
                            </Tabs> */}
                            <div style={{ width: '100%', height: '50px' }}>

                                <div>
                                    <Menu defaultSelectedKeys={[this.state.currentMenu]} mode="horizontal" onClick={(e) => { this.setState({ currentMenu: e.key }); }}>
                                        {
                                            this.state.menus.map(item => {
                                                return this.renderMenuItem(item, this.state.item);
                                            })
                                        }
                                    </Menu>
                                </div>
                            </div>
                            <div style={{height:'90%'}}>
                                <Route  path={`${match.url}/BasicInfo`} component={MCUBaseInfo}></Route>
                                <Route  path={`${match.url}/ParamConfig`} component={ParamConfig}></Route>
                                <Route  path={`${match.url}/UtilizationRatio`} component={null}></Route>
                                <Route  path={`${match.url}/BasicInfoEdit`} component={EditMCUImfo}></Route>
                                <Route  path={`${match.url}/ParamConfigEdit`} component={ParamConfigForm}></Route>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        );
    }
}
export default injectIntl(MCUDetail);
