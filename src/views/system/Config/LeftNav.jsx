import React, { Component } from "react";
import { Menu, Icon} from 'antd';
import cssObj from './Config.css';
import { NavLink } from 'react-router-dom';
import history from '@/config/history';
import intl from '@/config/i18n'
import zh_CN from './locale/zh_CN'
import en_US from './locale/en_US'

class LeftNav extends Component {
    constructor(){
        super()
        Object.assign(intl.options.locales['zh-CN'], zh_CN);
        Object.assign(intl.options.locales['en-US'], en_US);
        this.state = {
            meaus:[
                {
                    icon: 'desktop',
                    key: '/main/System/Config/ConferenceConfig'
                },
                {
                    icon: 'inbox',
                    key: '/main/System/Config/ConfAreaConfig'
                },
            ]
          }
    }
   
  
      renderMenuItem = ({ key, icon }) => {
        return (
            <Menu.Item key={key}>
                <NavLink to={key}>
                    {icon && <Icon type={icon} />}
                    <span>{intl.get(key.split('/').filter(i => i).pop())}</span>
                </NavLink>
            </Menu.Item>
        )
    }
    componentDidMount(){
        history.push({pathname:'/main/System/Config/ConferenceConfig'})
    }
    render(){
        return  <div style={{ width: 280}}>
        <Menu
          defaultSelectedKeys={['/main/System/Config/ConferenceConfig']}
          mode="inline"
          theme="light"
          className={cssObj.leftnav}
        >
           {
                    this.state.meaus.map(item => {
                        return this.renderMenuItem(item)
                    })
                }
        </Menu>
      </div>
    }
}
export default LeftNav
