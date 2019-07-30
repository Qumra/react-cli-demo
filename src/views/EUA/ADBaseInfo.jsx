// 基本信息
import React, { Component } from 'react';
import { Button } from 'antd';
import styleObj from './EUADetail.css';
import FirstBaseForm from './FirstBaseForm';
class ADBaseInfo extends Component {
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
        return (
            <div>
                <div className={styleObj.baseInfo} style={{display:this.state.display_name }}>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>启用企业通讯录</span> </div>
                        <div className={styleObj.wrapperDiv}>启用</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>名称</span> </div>
                        <div className={styleObj.wrapperDiv}>南京EUA</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>IP地址</span> </div>
                        <div className={styleObj.wrapperDiv}>10.22.22.33</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>对接帐号</span> </div>
                        <div className={styleObj.wrapperDiv}>dddkkk</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>对接密码</span> </div>
                        <div className={styleObj.wrapperDiv}>*******</div>
                    </div>
                    <div className={styleObj.formItem}>
                        <div className={styleObj.labelDiv}><span>备用通讯录服务器</span> </div>
                        <div className={styleObj.wrapperDiv}>********</div>
                    </div>
                    <Button type="primary" className={styleObj.editBtn} onClick={this.toggleEdit}>编辑</Button>
                </div>
                <div style={{display:this.state.display_edit}}>
                    <FirstBaseForm></FirstBaseForm>
                </div>
            </div>
        );
    }
}
export default ADBaseInfo;
