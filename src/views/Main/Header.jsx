import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import Logo from '@/components/Logo/Logo'
import LangDrop from '@/components/LangDrop/LangDrop'
import cssObj from './Header.css'
import intl from '@/config/i18n'
import history from '@/config/history';

const selectedStyle = {
    color: 'aqua',
}
class Header extends Component {
    constructor() {
        super()

        this.state = {
            theme: "light",
            current:"/main/home",
            menus: [
                {
                    icon: 'page',
                    key: '/main/home'
                }, {
                    icon: 'bulb',
                    key: '/main/Conference',
                    subs: [
                        { key: '/main/Conference/meetCreate', icon: '' },
                        { key: '/main/Conference/ConferenceTemplate', icon: '' },
                        { key: '/main/Conference/ScheduledConference', icon: '' },
                        { key: '/main/Conference/HistoryConference', icon: '' },
                    ]
                },
                {
                    icon: 'bulb',
                    key: '/main/Device',
                    subs: [
                        { key: '/main/Device/ParticipantsHelp', icon: '' },
                        { key: '/main/Device/mcu', icon: '' },
                        { key: '/main/Device/sc', icon: '' },
                        {
                            key: '/main/Device/Upgrade',
                            icon: '',
                            subs: [
                                { key: '/main/Device/SoftwareManage', icon: '' },
                                { key: '/main/Device/DeviceUpgrade', icon: '' },
                            ]
                        },
                    ]
                },
                {
                    icon: 'bulb',
                    key: '/main/System',
                    subs: [
                        { key: '/main/System/Config', icon: '' },
                        { key: '/main/System/UserNode', icon: '' },
                    ]
                },
            ]
        }
    }

    renderSubMenu = ({ key, icon, subs }) => {
        return (
            <Menu.SubMenu key={key} title={<span>{icon && <Icon type={icon} />}<span>{intl.get(key.split('/').filter(i => i).pop())}</span></span>}>
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }
    renderMenuItem = ({ key, icon }) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={key} activeStyle={selectedStyle}>
                    {icon && <Icon type={icon} />}
                    <span>{intl.get(key.split('/').filter(i => i).pop())}</span>
                </NavLink>
            </Menu.Item>
        )
    }

    getInitialState() {
        return {

        };
    };
    handleClick(e) {
        console.log('click ', e);
        history.push({ pathname: e.key });
        this.setState({
            current: e.key,
        });
    };
    render() {
        return <div className={cssObj.navStyle}>
            <div className={cssObj.LogoBox}><Logo width='120px' height='45px' float='left'></Logo></div>
            <Menu
                defaultSelectedKeys={[this.state.current]}
                defaultOpenKeys={['sub1']}
                theme={this.state.theme}
                mode="horizontal"
                className={cssObj.middleNav}
            >
                {
                    this.state.menus.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu>


            <Menu theme={this.state.theme}
                mode="horizontal" className={cssObj.toolBox}>
                <Menu.Item key="alipay1">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />{intl.get('changePassword')}</a>
                </Menu.Item>
                <Menu.Item>
                    <LangDrop></LangDrop>
                </Menu.Item>
                <Menu.Item key="alipay2">
                    <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />{intl.get('help')}</a>
                </Menu.Item>
            </Menu>
        </div>
    }
}
export default Header
