import React, { Component } from 'react';
import { Icon, Button, Menu} from 'antd';
import styleObj from './MCUDetail.css';
import ParamConfigForm from './ParamConfigForm';
const {SubMenu} = Menu;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];
class ParamConfig extends Component {
    constructor() {
        super();
        this.state = {
            openKeys: ['sub1']
        };


    }
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : []
            });
        }
    }
    render() {
        return(
            <div className={styleObj.paramConfig}>
                {/* <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    <SubMenu key="sub1" title={<span>H.323</span>}>
                        <div className={styleObj.leftDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>注册GK</span> </div>
                                <div className={styleObj.wrapperDiv}>是</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>H.323 ID </span> </div>
                                <div className={styleObj.wrapperDiv}>223333</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>SC</span> </div>
                                <div className={styleObj.wrapperDiv}>19660</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>认证密码</span> </div>
                                <div className={styleObj.wrapperDiv}>****</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>RAS端口</span> </div>
                                <div className={styleObj.wrapperDiv}>1718</div>
                            </div>
                        </div>
                        <div className={styleObj.rightDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>启用H.235加密</span> </div>
                                <div className={styleObj.wrapperDiv}>1718</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>GK地址</span> </div>
                                <div className={styleObj.wrapperDiv}>10.22.22.33</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>GK备用服务器地址</span> </div>
                                <div className={styleObj.wrapperDiv}>12.22.22.22</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>启用H.235加密</span> </div>
                                <div className={styleObj.wrapperDiv}>1718</div>
                            </div>
                        </div>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span>SIP</span>}>
                        <div className={styleObj.leftDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>本地端口</span> </div>
                                <div className={styleObj.wrapperDiv}>5060</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>重注册间隔(秒)</span> </div>
                                <div className={styleObj.wrapperDiv}>30</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>认证用户名</span> </div>
                                <div className={styleObj.wrapperDiv}></div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>注册服务器</span> </div>
                                <div className={styleObj.wrapperDiv}>是</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>服务器地址</span> </div>
                                <div className={styleObj.wrapperDiv}>200.90.34.211</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>服务器端口</span> </div>
                                <div className={styleObj.wrapperDiv}>5061</div>
                            </div>
                        </div>
                        <div className={styleObj.rightDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>服务器类型</span> </div>
                                <div className={styleObj.wrapperDiv}>标准</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>注册刷新间隔(秒)</span> </div>
                                <div className={styleObj.wrapperDiv}>300</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>SIP URI</span> </div>
                                <div className={styleObj.wrapperDiv}>0512123118</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span></span> </div>
                                <div className={styleObj.wrapperDiv}></div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>SIP备用服务器地址</span> </div>
                                <div className={styleObj.wrapperDiv}></div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>传输类型</span> </div>
                                <div className={styleObj.wrapperDiv}>TLS</div>
                            </div>
                        </div>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span>SNMP</span>}>
                        <div className={styleObj.leftDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>位置</span> </div>
                                <div className={styleObj.wrapperDiv}>HuaWei</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap超时时间(秒)</span> </div>
                                <div className={styleObj.wrapperDiv}>5</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap服务器地址1</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.10.1</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap服务器地址3</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.10.3</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap服务器地址5</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.10.5</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap用户名</span> </div>
                                <div className={styleObj.wrapperDiv}>trapinit</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap认证协议</span> </div>
                                <div className={styleObj.wrapperDiv}>SHA</div>
                            </div>
                        </div>
                        <div className={styleObj.rightDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>联系人</span> </div>
                                <div className={styleObj.wrapperDiv}>HuaWei</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap重试次数</span> </div>
                                <div className={styleObj.wrapperDiv}>3</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap服务器地址2</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.10.2</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap服务器地址4</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.10.4</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span></span> </div>
                                <div className={styleObj.wrapperDiv}></div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Engine ID</span> </div>
                                <div className={styleObj.wrapperDiv}>800039BA38025F9C</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>Trap加密协议</span> </div>
                                <div className={styleObj.wrapperDiv}>AES</div>
                            </div>
                        </div>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span>DNS</span>}>
                        <div className={styleObj.leftDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>主机名</span> </div>
                                <div className={styleObj.wrapperDiv}>HUAWEI_MCU</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>DNS服务器地址</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                            </div>
                        </div>
                        <div className={styleObj.rightDiv}>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>域名后缀</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                            </div>
                            <div className={styleObj.formItem}>
                                <div className={styleObj.labelDiv}><span>备DNS服务器地址</span> </div>
                                <div className={styleObj.wrapperDiv}>192.168.1.1</div>
                            </div>
                        </div>
                    </SubMenu>
                </Menu> */}
                <ParamConfigForm></ParamConfigForm>
            </div>
        );
    }
}
export default ParamConfig;
