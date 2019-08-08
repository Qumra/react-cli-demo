import React, { Component } from 'react';
import {Form, Switch, Icon, Input, Button, Menu, Tooltip, Select} from 'antd';
import styleObj from './MCUDetail.css';
const {SubMenu} = Menu;
const FormItem = Form.Item;
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
const {Option} = Select;
class ParamConfigForm extends Component {
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
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={styleObj.paramConfigForm}>
                <Form>
                    <Menu
                        mode="inline"
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                    >
                        <SubMenu key="sub1" title={<span>H.323</span>}>
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label="注册GK"
                                        colon={false}
                                    >
                                        {getFieldDecorator('registeGK', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
                                        )}
                                
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="H.323 ID "
                                        colon={false}
                                    >
                                        {getFieldDecorator('H.323ID', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid H.323ID!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="H.323 ID "
                                        colon={false}
                                    >
                                        {getFieldDecorator('SC', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SC!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">SC</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="认证密码"
                                        colon={false}
                                    >
                                        {getFieldDecorator('authenticationPassword', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid authenticationPassword!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="RAS端口"
                                        colon={false}
                                    >
                                        {getFieldDecorator('RASPort', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid RASPort!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label="启用H.235加密"
                                        colon={false}
                                    >
                                        {getFieldDecorator('enableH.235', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
                                        )}
                                
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="GK地址 "
                                        colon={false}
                                    >
                                        {getFieldDecorator('GKIP', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid GKIP!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">200.23.33.33</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="GK备用服务器地址 "
                                        colon={false}
                                    >
                                        {getFieldDecorator('StandbyGK', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid StandbyGK!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">200.23.33.33</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                    <Tooltip title="What do you want others to call you?">
                                        <Icon type="question-circle-o" className={styleObj.quetionIconModal}/>
                                    </Tooltip>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="注册状态"
                                        colon={false}
                                    >
                                        {getFieldDecorator('registeStatus', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registeStatus!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <span>已注册</span>
                                        )}
                                    </FormItem>
                                </div>
                            </div>               
                        </SubMenu>
                        <SubMenu key="sub2" title={<span>SIP</span>}>
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="本地端口"
                                        colon={false}
                                    >
                                        {getFieldDecorator('localPort', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid localPort!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="重注册间隔(秒)"
                                        colon={false}
                                    >
                                        {getFieldDecorator('registrationInterval', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registrationInterval!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="认证用户名"
                                        colon={false}
                                    >
                                        {getFieldDecorator('authenticationUserName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid authenticationUserName!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem 
                                        label="注册服务器"
                                        colon={false}
                                    >
                                        {getFieldDecorator('registerServer', {
                                        })(
                                            <Switch  onChange={this.onChange} defaultChecked/>
                                        )}
                                
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="服务器地址"
                                        colon={false}
                                    >
                                        {getFieldDecorator('serverIP', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverIP!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="服务器端口"
                                        colon={false}
                                    >
                                        {getFieldDecorator('serverPort', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverIP!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="服务器类型 "
                                        colon={false}
                                    >
                                        {getFieldDecorator('serverType', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid serverType!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">标准</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="注册刷新间隔(秒)"
                                        colon={false}
                                    >
                                        {getFieldDecorator('registrationRefreshInterval', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid registrationInterval!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="SIP URI"
                                        colon={false}
                                    >
                                        {getFieldDecorator('SIPURI', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SIPURI!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <div className={styleObj.formItem}>
                                        <div className={styleObj.labelDiv}></div>
                                        <div className={styleObj.wrapperDiv}></div>
                                    </div>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="SIP备用服务器地址"
                                        colon={false}
                                    >
                                        {getFieldDecorator('SIPStandbyServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid SIPStandbyServerAddress!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="传输类型"
                                        colon={false}
                                    >
                                        {getFieldDecorator('protocolType', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid protocolType!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">TLS</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            </div>               
                        </SubMenu>
                        <SubMenu key="sub3" title={<span>ISDN</span>}>
                                 
                        </SubMenu>
                        <SubMenu key="sub4" title={<span>SNMP</span>}>
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="位置"
                                        colon={false}
                                    >
                                        {getFieldDecorator('Location', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Location!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap超时时间(秒)"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapTimeoutTime', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapTimeoutTime!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap服务器地址1"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress1!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap服务器地址3"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress3!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap服务器地址5"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress5!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap用户名"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapUserName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapUserName!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap认证协议"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapAuthenticationProtocol', {
                                            initialValue: '1',
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapAuthenticationProtocol!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Select>
                                                <Option value="1">SHA</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="联系人"
                                        colon={false}
                                    >
                                        {getFieldDecorator('participant', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid participant!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap重试次数"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapAttempts', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapAttempts!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap服务器地址2"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress2!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap服务器地址4"
                                        colon={false}
                                    >
                                        {getFieldDecorator('TrapServerAddress1', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid TrapServerAddress4!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <div className={styleObj.formItem}>
                                        <div className={styleObj.labelDiv}></div>
                                        <div className={styleObj.wrapperDiv}></div>
                                    </div>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Engine ID"
                                        colon={false}
                                    >
                                        {getFieldDecorator('Engine ID', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Engine ID!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="Trap加密协议"
                                        colon={false}
                                    >
                                        {getFieldDecorator('encryptionProtocol', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid Engine ID!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                            </div>         
                        </SubMenu>
                        <SubMenu key="sub5" title={<span>DNS</span>}>
                            <div className={styleObj.leftForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="主机名"
                                        colon={false}
                                    >
                                        {getFieldDecorator('DNSHostName', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSHostName!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="DNS服务器地址"
                                        colon={false}
                                    >
                                        {getFieldDecorator('DNSServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSServerAddress!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>
                            </div>
                            <div className={styleObj.rightForm}>
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="域名后缀"
                                        colon={false}
                                    >
                                        {getFieldDecorator('DomainNameSuffix', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DomainNameSuffix!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>   
                                <div className={styleObj.tipParamDiv}>
                                    <FormItem
                                        label="备DNS服务器地址"
                                        colon={false}
                                    >
                                        {getFieldDecorator('DNSStandbyServerAddress', {
                                            rules: [
                                                { type: 'string', message: 'The input is not valid DNSStandbyServerAddress!' },
                                                { pattern: '', message: '' }
                                            ]
                                        })(
                                            <Input placeholder="请输入" />
                                        )}
                                    </FormItem>
                                </div>        
                            </div>
                        </SubMenu>
                    </Menu>
                    <div className={styleObj.btnGroup}>
                        <Button type="primary" htmlType="submit">保存</Button>
                        <Button type="default" className={styleObj.cancelBtn}>取消</Button>
                    </div>
                </Form>
            </div>
        );
    }
}
ParamConfigForm = Form.create()(ParamConfigForm);
export default ParamConfigForm;
