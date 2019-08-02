import React, { Component } from 'react';
import {Icon, Tabs, Button } from 'antd';
import cssObj from './EUADetailFirst.css';
import FirstBaseForm from './FirstBaseForm';
const {TabPane} = Tabs;
class EUADetailFirst extends Component {
    constructor() {
        super();
        this.state = {
            display_name:'block',
            display_edit:'none'
        };
       
    }
    toLink=()=>{
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
    }
    render() {
        
        return (<div className={cssObj.euaMain}>
            <div className={cssObj.euaContent}>
                <div className={cssObj.euaContentTitle}>
                    <span>企业通讯录管理</span>
                    <div className={cssObj.status} style={{display:this.state.display_edit }}>
                        <div className={cssObj.statusIcon}></div>
                        <span>未连接</span>
                    </div>
                    <Icon type="question-circle" theme="outlined" className={cssObj.questionIcon}/>
                </div>
                <div className={cssObj.euaContentMid} >
                    <div className={cssObj.unlink} style={{display:this.state.display_name }}>
                        <img src="" alt="未对接图" className={cssObj.unlinkImg}/>
                        <div className={cssObj.linkButton}>
                            <Button type="primary" onClick={this.toLink}>对接地址本服务器</Button>
                        </div>
                        <span className={cssObj.tip}>还未对接地址本服务器，请对接服务器</span>
                    </div>
                    <div className={cssObj.firstLink} style={{display:this.state.display_edit }}>
                        <Tabs defaultActiveKey="1" >
                            <TabPane tab="基本信息" key="1">
                                <FirstBaseForm></FirstBaseForm>
                            </TabPane>
                        </Tabs>
                    </div>
                   
                </div>
            </div>
        </div>);
    }
}
export default EUADetailFirst;
