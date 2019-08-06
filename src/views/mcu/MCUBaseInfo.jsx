import React, { Component } from 'react';
import {Button} from 'antd';
import styleObj from './MCUDetail.css';
import AddMCUInfo from './AddMCUInfo';
class MCUBaseInfo extends Component {
    constructor() {
        super();
        this.state = {
            display_name:'block',
            display_edit:'none'
        };
       
    }
    toggleEdit  = ()=>{
        if (this.state.display_name === 'none') {
            this.setState({
                display_name: 'block',
                display_edit:'none'
            });
        } else if (this.state.display_name === 'block') {
            this.setState({
                display_name: 'none',
                display_edit:'block'
            });
        }
    };
    render() {
        return(
            <div>
                <div className={styleObj.mcuBaseInfo} style={{display:this.state.display_name }}>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>名称</span> </div>
                        <div className={styleObj.wrapperDiv}>南京区MCU</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>IP地址</span> </div>
                        <div className={styleObj.wrapperDiv}>华为</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>区域</span> </div>
                        <div className={styleObj.wrapperDiv}>9660</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>对接帐号</span> </div>
                        <div className={styleObj.wrapperDiv}>10.22.22.22</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>对接密码</span> </div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>注册SC地址</span> </div>
                        <div className={styleObj.wrapperDiv}>0750</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>MCU标示</span> </div>
                        <div className={styleObj.wrapperDiv}>1897644332233</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>管理员帐号</span> </div>
                        <div className={styleObj.wrapperDiv}>加密</div>
                    </div>
               
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>管理员密码</span> </div>
                        <div className={styleObj.wrapperDiv}>****</div>
                    </div>
                    <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}>编辑</Button>
                </div>
                <div style={{display:this.state.display_edit}}>
                    <AddMCUInfo></AddMCUInfo>
                </div>
            </div>
        );
    }
}
export default MCUBaseInfo;
