import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo/Logo'
import LangDrop from '@/components/LangDrop/LangDrop'
import cssObj from './Header.css'
import intl from '@/config/i18n'
const SubMenu = Menu.SubMenu;
global.menus = [
    {
        title: intl.get('home'),
        icon: 'page',
        key: '/main/home'
    }, {
        title: intl.get('meeting'),
        icon: 'bulb',
        key: '/main/meeting/blue',
        subs: [
            { key: '/main/meeting/meetCreate', title: intl.get('meetCreate'), icon: '' },
            { key: '/main/meeting/ConferenceTemplate', title: intl.get('ConferenceTemplate'), icon: '' },
            { key: '/main/meeting/ScheduledConference', title: intl.get('ScheduledConference'), icon: '' },
            { key: '/main/meeting/HistoryConference', title: intl.get('HistoryConference'), icon: '' },
        ]
    },
    {
        title: intl.get('Device'),
        icon: 'bulb',
        key: '/main/device/1',
        subs: [
            { key: '/main/Device/ParticipantsHelp', title: '会场', icon: '' },
            { key: '/main/Device/mcu', title: 'mcu', icon: '' },
            { key: '/main/Device/sc', title: 'sc', icon: '' },
            { key: '/main/Device/SoftwareManage', 
            title: '升级', 
            icon: '' ,
            subs:[
                { key: '/main/Device/SoftwareManage', title: '软件管理', icon: '' },
                { key: '/main/Device/DeviceUpgrade', title: '会场/mcu升级', icon: '' },
            ]},
        ]
    },
    {
        title: intl.get('System'),
        icon: 'bulb',
        key: '/main/System/1',
        subs: [
            { key: '/main/System/Config', title: '配置', icon: '' },
            { key: '/main/System/user', title: '用户&组织类型', icon: '' },
        ]
    },
]
const menus = global.menus;
class Header extends Component {
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{title}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ key, icon, title, }) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={key}>
                    {icon && <Icon type={icon} />}
                    <span>{title}</span>
                </NavLink>
            </Menu.Item>
        )
    }
    constructor() {
        super()
        this.state = {
            theme: "light"
        }
    }
    getInitialState() {
        return {
            current: 'mail'
        };
    };
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        })
    };
    render() {
        return <div className={cssObj.navStyle}>
            <div className={cssObj.LogoBox}><Logo width='120px' height='45px' float='left'></Logo></div>
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                theme={this.state.theme}
                mode="horizontal"
                className={cssObj.middleNav}
            >
                {
                    menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>


            <Menu theme={this.state.theme}
                mode="horizontal" className={cssObj.toolBox}>
                <Menu.Item key="alipay1">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />修改</a>
                </Menu.Item>
                <Menu.Item>
                    <LangDrop></LangDrop>
                </Menu.Item>
                <Menu.Item key="alipay2">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
                </Menu.Item>
            </Menu>
        </div>
    }
}
export default Header
