import React, { Component } from "react";
import { Menu, Icon, Button } from 'antd';
import cssObj from './Config.css';
import { NavLink } from 'react-router-dom';
import intl from '@/config/i18n'
class LeftNav extends Component {
    state = {
        collapsed: false,
        meaus:[
            {
                icon: 'desktop',
                key: '/main/System/Config/Conference'
            },
            {
                icon: 'inbox',
                key: '/main/System/Config/Range'
            },
        ]
      }
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
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
    render(){
        return  <div style={{ width: 280}}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
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
